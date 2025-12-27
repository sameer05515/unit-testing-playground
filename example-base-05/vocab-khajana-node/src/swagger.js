const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Vocab Khajana API',
      version: '1.0.0',
      description: 'API for accessing vocabulary words with meanings and examples',
      contact: {
        name: 'API Support',
      },
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 3000}`,
        description: 'Development server',
      },
    ],
    tags: [
      {
        name: 'Words',
        description: 'Vocabulary words operations',
      },
    ],
  },
  apis: ['./src/server.js'], // Path to the API files
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;

