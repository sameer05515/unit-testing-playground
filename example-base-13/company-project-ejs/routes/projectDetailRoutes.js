const express = require("express");
const router = express.Router();
const detailModel = require("../models/projectDetailModel");
const projectModel = require("../models/projectModel");

router.get("/", (req, res) => {
  res.render("project-details/index", {
    details: detailModel.findAll(),
    projects: projectModel.findAll()
  });
});

router.get("/new", (req, res) => {
  res.render("project-details/form", {
    detail: {},
    projects: projectModel.findAll(),
    mode: "create"
  });
});

router.post("/", (req, res) => {
  detailModel.create(req.body);
  res.redirect("/project-details");
});

router.get("/:id/edit", (req, res) => {
  const detail = detailModel.findById(req.params.id);
  if (!detail) return res.status(404).render("error", { status: 404, message: "Project detail not found" });

  res.render("project-details/form", {
    detail,
    projects: projectModel.findAll(),
    mode: "edit"
  });
});

router.put("/:id", (req, res) => {
  detailModel.update(req.params.id, req.body);
  res.redirect("/project-details");
});

router.delete("/:id", (req, res) => {
  detailModel.remove(req.params.id);
  res.redirect("/project-details");
});

module.exports = router;