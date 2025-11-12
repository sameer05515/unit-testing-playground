import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import redoc from 'redoc-express';
import employeeRoutes from './routes/employeeRoutes.js';
import studentsRouter from './routes/students.js';
import openApiSpecification from './docs/openapi.js';

const app = express();
const port = 3000;

app.use(bodyParser.json({ limit: '100mb' }));
app.use(cors());

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

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
