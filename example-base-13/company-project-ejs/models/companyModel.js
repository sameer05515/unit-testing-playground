const { readDb, writeDb, generateId } = require("../utils/jsonDb");

function findAll() {
  return readDb().companies;
}

function findById(id) {
  return findAll().find(c => c.id === id);
}

function create(data) {
  const db = readDb();
  const company = {
    id: generateId("cmp"),
    name: data.name,
    industry: data.industry,
    location: data.location,
    createdAt: new Date().toISOString()
  };
  db.companies.push(company);
  writeDb(db);
  return company;
}

function update(id, data) {
  const db = readDb();
  const company = db.companies.find(c => c.id === id);
  if (!company) return null;

  company.name = data.name;
  company.industry = data.industry;
  company.location = data.location;

  writeDb(db);
  return company;
}

function remove(id) {
  const db = readDb();
  const exists = db.companies.some(c => c.id === id);
  if (!exists) return false;

  // Remove projects and their details belonging to this company.
  const projectIds = db.projects
    .filter(p => p.companyId === id)
    .map(p => p.id);

  db.companies = db.companies.filter(c => c.id !== id);
  db.projects = db.projects.filter(p => p.companyId !== id);
  db.projectDetails = db.projectDetails.filter(d => !projectIds.includes(d.projectId));

  writeDb(db);
  return true;
}

module.exports = { findAll, findById, create, update, remove };