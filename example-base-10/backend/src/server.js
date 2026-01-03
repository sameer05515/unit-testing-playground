const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Swagger UI
app.use('/swagger-ui', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'Backend API Documentation'
}));

// Redoc
app.get('/redoc', (req, res) => {
  const redocHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Backend API - ReDoc</title>
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
        <redoc spec-url='/api-docs.json'></redoc>
        <script src="https://cdn.redoc.ly/redoc/latest/bundles/redoc.standalone.js"> </script>
      </body>
    </html>
  `;
  res.send(redocHtml);
});

// OpenAPI JSON endpoint
app.get('/api-docs.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

// The GitHub raw URL
const GITHUB_JSON_URL =
  "https://raw.githubusercontent.com/sameer05515/microservices-playground/main/example-base-03/fontend/chat-gpt-conversation/src/common/utils/snapshots.json";

/**
 * @swagger
 * /api/snapshots:
 *   get:
 *     summary: Fetch snapshots JSON with wrapper
 *     description: Fetches JSON data from GitHub raw URL and returns it with a success wrapper
 *     tags: [Snapshots]
 *     responses:
 *       200:
 *         description: Successfully fetched snapshots
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   description: The JSON data from GitHub
 *                 source:
 *                   type: string
 *                   example: https://raw.githubusercontent.com/...
 *       404:
 *         description: Failed to fetch data from GitHub
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                 status:
 *                   type: number
 *                 statusText:
 *                   type: string
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                 message:
 *                   type: string
 */
app.get('/api/snapshots', async (req, res) => {
  try {
    const response = await fetch(GITHUB_JSON_URL);
    
    if (!response.ok) {
      return res.status(response.status).json({
        error: 'Failed to fetch data from GitHub',
        status: response.status,
        statusText: response.statusText
      });
    }
    
    const data = await response.json();
    
    res.json({
      success: true,
      data: data,
      source: GITHUB_JSON_URL
    });
  } catch (error) {
    console.error('Error fetching JSON:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error.message
    });
  }
});

/**
 * @swagger
 * /api/snapshots/raw:
 *   get:
 *     summary: Fetch snapshots JSON (raw)
 *     description: Fetches JSON data from GitHub raw URL and returns the raw JSON without wrapper
 *     tags: [Snapshots]
 *     responses:
 *       200:
 *         description: Successfully fetched raw snapshots
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               description: Raw JSON data from GitHub
 *       404:
 *         description: Failed to fetch data from GitHub
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                 status:
 *                   type: number
 *                 statusText:
 *                   type: string
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                 message:
 *                   type: string
 */
app.get('/api/snapshots/raw', async (req, res) => {
  try {
    const response = await fetch(GITHUB_JSON_URL);
    
    if (!response.ok) {
      return res.status(response.status).json({
        error: 'Failed to fetch data from GitHub',
        status: response.status,
        statusText: response.statusText
      });
    }
    
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching JSON:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: error.message
    });
  }
});

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Health check endpoint
 *     description: Returns the health status of the API server
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: Server is healthy
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: ok
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *                   example: 2024-01-01T00:00:00.000Z
 */
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString()
  });
});

/**
 * @swagger
 * /:
 *   get:
 *     summary: Root endpoint
 *     description: Returns API documentation and available endpoints
 *     tags: [Info]
 *     responses:
 *       200:
 *         description: API information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Backend API Server
 *                 endpoints:
 *                   type: object
 *                   description: Available API endpoints
 *                 documentation:
 *                   type: object
 *                   properties:
 *                     swagger:
 *                       type: string
 *                       example: /swagger-ui
 *                     redoc:
 *                       type: string
 *                       example: /redoc
 *                     openapi:
 *                       type: string
 *                       example: /api-docs.json
 */
app.get('/', (req, res) => {
  res.json({
    message: 'Backend API Server',
    endpoints: {
      '/api/snapshots': 'GET - Fetch snapshots JSON with wrapper',
      '/api/snapshots/raw': 'GET - Fetch snapshots JSON (raw)',
      '/health': 'GET - Health check'
    },
    documentation: {
      swagger: '/swagger-ui',
      redoc: '/redoc',
      openapi: '/api-docs.json'
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`API endpoint: http://localhost:${PORT}/api/snapshots`);
  console.log(`Swagger UI: http://localhost:${PORT}/swagger-ui`);
  console.log(`ReDoc: http://localhost:${PORT}/redoc`);
  console.log(`OpenAPI JSON: http://localhost:${PORT}/api-docs.json`);
});
