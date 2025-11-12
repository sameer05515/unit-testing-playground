const path = require('node:path');
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const redoc = require('redoc-express');

const buildTree = require('./src/text-indentation/buildTree');
const openApiDocument = require('./docs/openapi.json');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/docs/openapi.json', (_req, res) => {
  res.json(openApiDocument);
});

app.use('/docs/swagger', swaggerUi.serve, swaggerUi.setup(openApiDocument));
app.get(
  '/docs/redoc',
  redoc({
    title: 'Build Tree API Docs',
    specUrl: '/docs/openapi.json'
  })
);

app.get('/', (_req, res) => {
  res.render('welcome', {
    playgroundUrl: '/playground',
    docs: [
      { name: 'Swagger UI', href: '/docs/swagger' },
      { name: 'Redoc', href: '/docs/redoc' },
      { name: 'OpenAPI JSON', href: '/docs/openapi.json' }
    ]
  });
});

app.get('/playground', (_req, res) => {
  res.render('index', { result: null, error: null, input: '' });
});

app.post('/playground', (req, res) => {
  const { textInput = '' } = req.body;
  const result = buildTree(textInput);

  if (!result.isValid) {
    return res.render('index', { result: null, error: result, input: textInput });
  }

  return res.render('index', { result, error: null, input: textInput });
});

app.post('/api/build-tree', (req, res) => {
  const { textInput = '' } = req.body;
  const result = buildTree(textInput);
  res.json(result);
});

app.post('/build-tree', (req, res) => {
  const { textInput = '' } = req.body;
  const result = buildTree(textInput);

  if (!result.isValid) {
    return res.render('index', { result: null, error: result, input: textInput });
  }

  return res.render('index', { result, error: null, input: textInput });
});

app.use((req, res) => {
  res.status(404).render('404', { path: req.path });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`build-tree-api listening on http://localhost:${PORT}`);
});

