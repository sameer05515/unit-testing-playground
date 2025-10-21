const express = require("express");

const router = express.Router();

// Routes
const pdfsHomeRoutesV1 = require("./pdf-data/pdfs.home.v1");
const pdfsHomeRoutesV2 = require("./pdf-data/pdfs.home.v2");
const pdfsHomeRoutesV3 = require("./pdf-data/pdfs.home.v3");

const chatViewerRoutes = require("./chat-viewer");
const dataProcessingStrategiesViewerRoutes = require("./data-processing-strategies");
const crudDemoRoutesV2 = require("./crud-demo/item.routes.v2");
const codeHighlightViewerRoutes = require("./code-highlighting/routes");
const analyseCgptRoutes = require("./analyse-cgpt");

// const { Pages } = require("../public/page-data/PageData.repository");
router.use("/pdf-viewer/v1", pdfsHomeRoutesV1);
router.use("/pdf-viewer/v2", pdfsHomeRoutesV2);
router.use("/pdf-viewer/v3", pdfsHomeRoutesV3);

router.use("/chat-viewer", chatViewerRoutes);
router.use("/data-processing-strategies-viewer", dataProcessingStrategiesViewerRoutes);

router.use("/crud-demo", crudDemoRoutesV2);

router.get("/plans-viewer/v1", (req, res) => {
  // const slug = req.query.slug || null;
  res.render("plans-renderer/v1.ejs");
});

router.get("/plans-viewer/v2", (req, res) => {
  // const slug = req.query.slug || null;
  res.render("plans-renderer/v2.ejs");
});

router.get("/plans-viewer/v3", (req, res) => {
  // const slug = req.query.slug || null;
  res.render("plans-renderer/v3.ejs");
});

router.get("/plans-viewer/v4", (req, res) => {
  // const slug = req.query.slug || null;
  // const planId = "🚀🚀🚀🚀ETL Pipeline ka id de do🎯🎯🎯🪄🪄🪄🪄🪄🪄🪄🪄🪄";
  const planId = req.query.planId || null;
  res.render("plans-renderer/v4.ejs", { id: planId });
});

router.get("/plans-viewer/v5", (req, res) => {
  // const slug = req.query.slug || null;
  res.render("plans-renderer/v5.ejs");
});

router.get("/table-generator/v1", (req, res) => {
  res.render("table-generator/v1.ejs");
});

router.get("/table-generator/v2", (req, res) => {
  const num = req.query.num || null;
  res.render("table-generator/v2.ejs", { givenNum: num });
});

router.get("/visible-messages-tracking/v1", (req, res) => {
  res.render("visible-messages-tracking/v1.ejs");
});

router.get("/visible-messages-tracking/v2", (req, res) => {
  res.render("visible-messages-tracking/v2.ejs");
});

router.get("/visible-messages-tracking/v3", (req, res) => {
  res.render("visible-messages-tracking/v3.ejs");
});

router.get("/visible-messages-tracking/v4", (req, res) => {
  res.render("visible-messages-tracking/v4.ejs");
});

//holi-dynamic-loader
router.get("/holi-dynamic-loader", (req, res) => {
  res.render("holi-dynamic-loader/index.ejs");
});

///code-highlighting

// router.get("/code-highlighting/:version", (req, res) => {
//   const { version } = req.params;
//   const validVersions = ["v1.0", "v1.1", "v1.2", "v2.0"];
//   if (validVersions.includes(version)) {
//     res.render(`code-highlighting/${version}.ejs`);
//   } else {
//     res.status(404).render("404.ejs", {
//       errorMessage: `
//       unknown version: ${version},
//       valid 'code-highlighting' versions : ${validVersions.join(", ")}`,
//     });
//   }
// });

router.use("/code-highlighting", codeHighlightViewerRoutes);
router.use("/analyse-cgpt", analyseCgptRoutes);

router.get("/date-range/v1", (req, res) => {
  res.render("date-range/v1.ejs");
});
router.get("/date-range/v2", (req, res) => {
  res.render("date-range/v2.ejs");
});
router.get("/date-range/v3", (req, res) => {
  res.render("date-range/v3.ejs");
});

router.get("/", (req, res) => {
  // res.render("index", { pages: Pages });
  res.render("index");
});

router.use((req, res) => {
  const unknownRoute = {
    method: req.method, // GET, POST, PUT, DELETE, etc.
    url: req.originalUrl, // Full requested URL
    timestamp: new Date().toISOString(), // Current timestamp
    ip: req.ip, // Client's IP address
  };

  const errorMessage = `
  🚨 404 Error! Page Not Found! 🚨  
  ➝ Route: ${unknownRoute.method} ${unknownRoute.url}  
  ➝ Time: ${unknownRoute.timestamp}  
  ➝ IP: ${unknownRoute.ip}`;

  if (req.accepts("html")) {
    res.status(404).render("404.ejs", { errorMessage });
  } else {
    res.status(404).json({ error: "API Endpoint Not Found!", details: unknownRoute });
  }
});

module.exports = router;
