const express = require("express");
const app = express();
const { PORT, SERVER_VERSION, purpose } = require("./config/version-config");
const authenticateToken = require("./middleware/authenticateToken");


const routerResponseHandler = require('../../common/middlewares/routerResponseHandler');

// Import route modules
const postRoutes = require("./routes/post.routes");
const loginRoutes = require("./routes/login.routes");
const sampleRoutes = require("./routes/sample.routes");
const roleProtectedRoutes= require('./routes/roleProtected.routes')

app.use(express.json());

// Use the routes
app.use(postRoutes);
app.use(loginRoutes);
app.use(authenticateToken,sampleRoutes);
app.use('/roles', roleProtectedRoutes);

// Apply centralized routerResponseHandler to all routes
app.use(routerResponseHandler);

console.log(
  `${purpose} \n [${new Date().toString()}]: Starting server with version '${SERVER_VERSION}' on http://localhost:${PORT}`
);
app.listen(PORT);
