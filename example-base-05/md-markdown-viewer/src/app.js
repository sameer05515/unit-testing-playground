const path = require('path');
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const redoc = require('redoc-express');
const { marked } = require('marked');
const { markedHighlight } = require('marked-highlight');
const Prism = require('prismjs');

require('prismjs/components/prism-bash');
require('prismjs/components/prism-json');
require('prismjs/components/prism-typescript');
require('prismjs/components/prism-jsx');
require('prismjs/components/prism-python');

const config = require('../configuration');
const { scanMarkdownFiles } = require('./services/fileScanner');
const openApiSpec = require('./docs/openapi.json');

const app = express();
const CACHE_TTL = 10_000;
let cache = { data: [], timestamp: 0 };

marked.use(
  markedHighlight({
    langPrefix: 'language-',
    highlight(code, lang) {
      const grammar = Prism.languages[lang] || Prism.languages.markup;
      return Prism.highlight(code, grammar, lang);
    }
  })
);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', 'views'));

// CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.use('/static', express.static(path.join(__dirname, '..', 'public')));
app.get('/docs/openapi.json', (_req, res) => {
  res.json(openApiSpec);
});
app.use('/docs/swagger', swaggerUi.serve, swaggerUi.setup(openApiSpec, { customSiteTitle: 'Markdown Explorer · Swagger' }));
app.get(
  '/docs/redoc',
  redoc({
    title: 'Markdown Explorer · ReDoc',
    specUrl: '/docs/openapi.json'
  })
);

async function getMarkdownData(force = false) {
  const shouldUseCache = !force && Date.now() - cache.timestamp < CACHE_TTL && cache.data.length;
  if (shouldUseCache) {
    return cache.data;
  }

  const data = await scanMarkdownFiles(config.markdownRoots || []);
  cache = {
    data,
    timestamp: Date.now()
  };
  return data;
}

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', totalFiles: cache.data.length });
});

const toPublicFile = (file) => ({
  name: file.name,
  slug: file.slug,
  relativePath: file.relativePath,
  index: file.index,
  total: file.total
});

app.get('/api/files', async (req, res, next) => {
  try {
    const files = await getMarkdownData(req.query.refresh === 'true');
    res.json({
      total: files.length,
      files: files.map(toPublicFile)
    });
  } catch (error) {
    next(error);
  }
});

app.get('/api/files/:slug', async (req, res, next) => {
  try {
    const files = await getMarkdownData(req.query.refresh === 'true');
    const file = files.find((entry) => entry.slug === req.params.slug);
    if (!file) {
      res.status(404).json({ error: 'File not found.' });
      return;
    }
    res.json({
      ...toPublicFile(file),
      content: file.content
    });
  } catch (error) {
    next(error);
  }
});

app.get('/', async (req, res, next) => {
  try {
    const files = await getMarkdownData(req.query.refresh === 'true');

    if (!files.length) {
      res.render('index', {
        files: [],
        activeFile: null,
        renderedContent: '<p class="text-slate-400">No markdown files found. Update configuration.js to point at valid folders.</p>',
        meta: { currentIndex: 0, total: 0 }
      });
      return;
    }

    const requestedSlug = req.query.slug;
    const fallbackIndex = 0;
    const activeIndex = files.findIndex((file) => file.slug === requestedSlug);
    const file = files[activeIndex >= 0 ? activeIndex : fallbackIndex];

    res.render('index', {
      files,
      activeFile: file,
      renderedContent: marked.parse(file.content),
      meta: { currentIndex: file.index + 1, total: files.length }
    });
  } catch (error) {
    next(error);
  }
});

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).send('Unexpected server error.');
});

const PORT = config.port || 3030;

app.listen(PORT, () => {
  console.log(`Markdown viewer ready on http://localhost:${PORT}`);
});

