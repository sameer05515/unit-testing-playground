const express = require("express");
const path = require("path");

const router = express.Router();

router.get("/v1", (req, res) => {
  res.render("chat-renderer/v1.ejs");
});

router.get("/v3", (req, res) => {
  res.render("chat-renderer/v3.ejs");
});

router.get("/v4", (req, res) => {
  const convIdx = req.query.convIdx || null;
  const sVer = "v4";
  res.render("chat-renderer/v4.ejs", { sVer, convIdx });
});

router.get("/v4.1", (req, res) => {
  const convIdx = req.query.convIdx || null;
  const sVer = "v3";
  res.render("chat-renderer/v4.1.ejs", { sVer, convIdx });
});

router.get("/v5", (req, res) => {
  const convIdx = req.query.convIdx || null;
  const sVer = req.query.sVer || 'v3';
  res.render("chat-renderer/v5.ejs", { sVer, convIdx });
});

module.exports = router;
