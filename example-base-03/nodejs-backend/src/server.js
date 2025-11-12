import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import redoc from 'redoc-express';
import path from 'path';
import { fileURLToPath } from 'url';
import employeeRoutes from './routes/employeeRoutes.js';
import studentsRouter from './routes/students.js';
import openApiSpecification from './docs/openapi.js';

const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(bodyParser.json({ limit: '100mb' }));
app.use(cors());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// API documentation
app.get('/docs/openapi.json', (req, res) => {
  res.json(openApiSpecification);
});
app.use('/docs/swagger', swaggerUi.serve, swaggerUi.setup(openApiSpecification));
app.get(
  '/docs/redoc',
  redoc({
    title: 'Sample API Documentation',
    specUrl: '/docs/openapi.json'
  })
);

// Routes
app.use('/api', employeeRoutes);
app.use('/students', studentsRouter);

app.get('/', (req, res) => {
  res.json({
    message: 'Sample nodejs-backend is running. Visit /docs/swagger or /docs/redoc for API docs.'
  });
});

app.get('/welcome', (req, res) => {
  res.render('welcome', {
    title: 'Welcome',
    description: 'Explore the sample API via the links below.',
    links: [
      { href: '/docs/swagger', label: 'Swagger UI' },
      { href: '/docs/redoc', label: 'Redoc' },
      { href: '/dashboard', label: 'API Dashboard' },
      { href: '/students', label: 'Students JSON' },
      { href: '/api/employees', label: 'Employees JSON' }
    ]
  });
});

app.get('/dashboard', async (req, res, next) => {
  try {
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const [employeesResponse, studentsResponse] = await Promise.all([
      fetch(`${baseUrl}/api/employees`),
      fetch(`${baseUrl}/students`)
    ]);

    if (!employeesResponse.ok || !studentsResponse.ok) {
      throw new Error('Unable to retrieve data from internal APIs');
    }

    const [employees, students] = await Promise.all([
      employeesResponse.json(),
      studentsResponse.json()
    ]);

    res.render('dashboard', {
      title: 'API Dashboard',
      employees,
      students
    });
  } catch (error) {
    next(error);
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
