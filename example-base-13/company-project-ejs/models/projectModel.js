const { readDb, writeDb, generateId } = require("../utils/jsonDb");

function findAll() {
  return readDb().projects;
}

function findById(id) {
  return findAll().find(p => p.id === id);
}

function findByCompanyId(companyId) {
  return findAll().filter(p => p.companyId === companyId);
}

function create(data) {
  const db = readDb();
  const project = {
    id: generateId("prj"),
    companyId: data.companyId,
    name: data.name,
    description: data.description,
    status: data.status,
    startDate: data.startDate,
    endDate: data.endDate,
    createdAt: new Date().toISOString()
  };
  db.projects.push(project);
  writeDb(db);
  return project;
}

function update(id, data) {
  const db = readDb();
  const project = db.projects.find(p => p.id === id);
  if (!project) return null;

  project.companyId = data.companyId;
  project.name = data.name;
  project.description = data.description;
  project.status = data.status;
  project.startDate = data.startDate;
  project.endDate = data.endDate;

  writeDb(db);
  return project;
}

function remove(id) {
  const db = readDb();
  const exists = db.projects.some(p => p.id === id);
  if (!exists) return false;

  db.projects = db.projects.filter(p => p.id !== id);
  db.projectDetails = db.projectDetails.filter(d => d.projectId !== id);

  writeDb(db);
  return true;
}

module.exports = {
  findAll,
  findById,
  findByCompanyId,
  create,
  update,
  remove
};