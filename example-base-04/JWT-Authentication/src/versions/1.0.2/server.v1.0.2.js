const express = require("express");
const app = express();
const { PORT, SERVER_VERSION, purpose } = require("./config/version-config");

// Import route modules
const postRoutes = require("./routes/postRoutes");
const loginRoutes = require("./routes/loginRoutes");

app.use(express.json());

// Use the routes
app.use(postRoutes);
app.use(loginRoutes);

// console.log(`Starting server with version '1.0.1' on http://localhost:${PORT}`);
console.log(
  `${purpose} \n [${new Date().toString()}]: Starting server with version '${SERVER_VERSION}' on http://localhost:${PORT}`
);
app.listen(PORT);
