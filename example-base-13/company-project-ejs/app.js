const express = require("express");
const path = require("path");
const methodOverride = require("method-override");

const companyRoutes = require("./routes/companyRoutes");
const projectRoutes = require("./routes/projectRoutes");
const projectDetailRoutes = require("./routes/projectDetailRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

app.locals.formatDate = (value) => {
  if (!value) return "";
  return new Date(value).toLocaleString();
};

app.get("/", (req, res) => {
  res.render("index");
});

app.use("/companies", companyRoutes);
app.use("/projects", projectRoutes);
app.use("/project-details", projectDetailRoutes);

app.use((req, res) => {
  res.status(404).render("error", {
    status: 404,
    message: "Page not found"
  });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).render("error", {
    status: 500,
    message: "Internal server error"
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});