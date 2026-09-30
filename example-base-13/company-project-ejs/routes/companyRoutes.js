const express = require("express");
const router = express.Router();
const companyModel = require("../models/companyModel");
const projectModel = require("../models/projectModel");

router.get("/", (req, res) => {
  res.render("companies/index", {
    companies: companyModel.findAll(),
    projects: projectModel.findAll()
  });
});

router.get("/new", (req, res) => {
  res.render("companies/form", {
    company: {},
    mode: "create"
  });
});

router.post("/", (req, res) => {
  companyModel.create(req.body);
  res.redirect("/companies");
});

router.get("/:id", (req, res) => {
  const company = companyModel.findById(req.params.id);
  if (!company) return res.status(404).render("error", { status: 404, message: "Company not found" });

  res.render("companies/view", {
    company,
    projects: projectModel.findByCompanyId(company.id)
  });
});

router.get("/:id/edit", (req, res) => {
  const company = companyModel.findById(req.params.id);
  if (!company) return res.status(404).render("error", { status: 404, message: "Company not found" });

  res.render("companies/form", { company, mode: "edit" });
});

router.put("/:id", (req, res) => {
  companyModel.update(req.params.id, req.body);
  res.redirect("/companies");
});

router.delete("/:id", (req, res) => {
  companyModel.remove(req.params.id);
  res.redirect("/companies");
});

module.exports = router;