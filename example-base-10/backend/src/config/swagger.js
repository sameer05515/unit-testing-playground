const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Backend API',
      version: '1.0.0',
      description: 'Express API backend for fetching JSON data from GitHub',
      contact: {
        name: 'API Support',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
    ],
  },
  apis: ['../server.js'], // Path to the API files (relative to this config file)
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
