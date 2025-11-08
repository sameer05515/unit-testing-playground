// swagger.js
const swaggerJsdoc = require("swagger-jsdoc");
const path = require("path");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Word CRUD API",
      version: "1.0.0",
      description: "Simple Word CRUD API with pagination and JSON storage",
    },
    servers: [
      {
        url: "http://localhost:3030/api",
      },
    ],
  },
//   apis: ["./routes/words.js"], // path to your route file
apis: [path.join(__dirname, "./routes/*.js")], // ✅ absolute path
};

module.exports = swaggerJsdoc(options);
