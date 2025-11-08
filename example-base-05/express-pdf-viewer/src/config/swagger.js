const swaggerJsdoc = require('swagger-jsdoc');
const path = require('path');
const { PORT, NODE_ENV } = require('../common/constants');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Express PDF Viewer API',
      version: '1.0.0',
      description: 'API documentation for Express PDF Viewer application',
      contact: {
        name: 'API Support',
      },
      license: {
        name: 'ISC',
      },
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
        description: 'Development server',
      },
      {
        url: 'https://api.example.com',
        description: 'Production server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        Error: {
          type: 'object',
          properties: {
            error: {
              type: 'boolean',
              example: true,
            },
            message: {
              type: 'string',
              example: 'Error message',
            },
          },
        },
        Pagination: {
          type: 'object',
          properties: {
            page: {
              type: 'integer',
              example: 0,
            },
            pageSize: {
              type: 'integer',
              example: 20,
            },
            total: {
              type: 'integer',
              example: 100,
            },
            totalPages: {
              type: 'integer',
              example: 5,
            },
            hasNext: {
              type: 'boolean',
              example: true,
            },
            hasPrev: {
              type: 'boolean',
              example: false,
            },
          },
        },
      },
    },
    tags: [
      {
        name: 'ChatData',
        description: 'Chat data and conversation endpoints',
      },
      {
        name: 'AnalyseCgpt',
        description: 'ChatGPT analysis endpoints',
      },
      {
        name: 'Health',
        description: 'Health check and monitoring endpoints',
      },
    ],
  },
  apis: [
    path.join(__dirname, '../routes/**/*.js'),
    path.join(__dirname, '../routes/*.js'),
  ],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;

