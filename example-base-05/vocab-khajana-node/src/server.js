const express = require('express');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
const { loadWords } = require('./xml-loader');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '..', 'public')));

/**
 * @swagger
 * /api/words:
 *   get:
 *     summary: Get all vocabulary words
 *     description: Retrieves a list of all vocabulary words with their meanings and examples from the XML file. Results are cached for 5 minutes by default.
 *     tags: [Words]
 *     responses:
 *       200:
 *         description: Successful response with array of words
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: Unique identifier for the word (index-based)
 *                     example: 0
 *                   word:
 *                     type: string
 *                     description: The vocabulary word
 *                     example: "abase"
 *                   type:
 *                     type: string
 *                     description: Part of speech (noun, verb, adjective, etc.)
 *                     example: "verb"
 *                   meanings:
 *                     type: array
 *                     description: Array of meanings/definitions for the word
 *                     items:
 *                       type: string
 *                     example: ["to humiliate", "degrade"]
 *                   examples:
 *                     type: array
 *                     description: Array of example sentences using the word
 *                     items:
 *                       type: string
 *                     example: ["After being overthrown and abased, the deposed leader offered to bow down to his conqueror."]
 *       500:
 *         description: Server error - failed to load vocabulary list
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Failed to load vocabulary list."
 */
app.get('/api/words', async (req, res, next) => {
  try {
    const words = await loadWords();
    res.json(words);
  } catch (error) {
    next(error);
  }
});

// Swagger UI Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'Vocab Khajana API Documentation',
}));

// ReDoc Documentation
app.get('/redoc', (req, res) => {
  const redocHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Vocab Khajana API - ReDoc</title>
        <meta charset="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link href="https://fonts.googleapis.com/css?family=Montserrat:300,400,700|Roboto:300,400,700" rel="stylesheet">
        <style>
          body {
            margin: 0;
            padding: 0;
          }
        </style>
      </head>
      <body>
        <redoc spec-url='/api-docs/swagger.json'></redoc>
        <script src="https://cdn.redoc.ly/redoc/latest/bundles/redoc.standalone.js"></script>
      </body>
    </html>
  `;
  res.send(redocHtml);
});

// Serve Swagger JSON
app.get('/api-docs/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

app.use((error, req, res, next) => {
  // eslint-disable-next-line no-console
  console.error(error);
  res.status(500).json({ message: 'Failed to load vocabulary list.' });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on http://localhost:${PORT}`);
  // eslint-disable-next-line no-console
  console.log(`Swagger UI: http://localhost:${PORT}/api-docs`);
  // eslint-disable-next-line no-console
  console.log(`ReDoc: http://localhost:${PORT}/redoc`);
});

