const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Serve static files (CSS, Bootstrap)
app.use(express.static(path.join(__dirname, "../public")));

// Set EJS as view engine and views folder
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));

// Enable CORS globally
app.use(cors());

const v2Routes = require("./routes/index.v2");

app.use(bodyParser.urlencoded({ extended: true }));

app.use("", v2Routes);

// Start Server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
