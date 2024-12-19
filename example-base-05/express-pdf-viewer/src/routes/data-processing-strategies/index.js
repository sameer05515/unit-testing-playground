const express = require("express");
const path = require("path");

const router = express.Router();

router.get("/v1", (req, res) => {
  res.render("data-processing-strategies-renderer/v1.ejs");
});

// router.get("/v3", (req, res) => {
//   res.render("chat-renderer/v3.ejs");
// });

// router.get("/v4", (req, res) => {
//   res.render("chat-renderer/v4.ejs");
// });

module.exports = router;
