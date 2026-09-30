const express = require("express");
const router = express.Router();
const projectModel = require("../models/projectModel");
const companyModel = require("../models/companyModel");
const detailModel = require("../models/projectDetailModel");

router.get("/", (req, res) => {
  res.render("projects/index", {
    projects: projectModel.findAll(),
    companies: companyModel.findAll(),
    details: detailModel.findAll()
  });
});

router.get("/new", (req, res) => {
  res.render("projects/form", {
    project: {},
    companies: companyModel.findAll(),
    mode: "create"
  });
});

router.post("/", (req, res) => {
  projectModel.create(req.body);
  res.redirect("/projects");
});

router.get("/:id", (req, res) => {
  const project = projectModel.findById(req.params.id);
  if (!project) return res.status(404).render("error", { status: 404, message: "Project not found" });

  const company = companyModel.findById(project.companyId);
  const details = detailModel.findByProjectId(project.id);

  res.render("projects/view", { project, company, details });
});

router.get("/:id/edit", (req, res) => {
  const project = projectModel.findById(req.params.id);
  if (!project) return res.status(404).render("error", { status: 404, message: "Project not found" });

  res.render("projects/form", {
    project,
    companies: companyModel.findAll(),
    mode: "edit"
  });
});

router.put("/:id", (req, res) => {
  projectModel.update(req.params.id, req.body);
  res.redirect("/projects");
});

router.delete("/:id", (req, res) => {
  projectModel.remove(req.params.id);
  res.redirect("/projects");
});

module.exports = router;