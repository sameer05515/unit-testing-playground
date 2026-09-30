const { readDb, writeDb, generateId } = require("../utils/jsonDb");

function findAll() {
  return readDb().projectDetails;
}

function findById(id) {
  return findAll().find(d => d.id === id);
}

function findByProjectId(projectId) {
  return findAll().filter(d => d.projectId === projectId);
}

function create(data) {
  const db = readDb();
  const detail = {
    id: generateId("dtl"),
    projectId: data.projectId,
    technology: data.technology,
    teamSize: Number(data.teamSize) || 0,
    budget: Number(data.budget) || 0,
    clientName: data.clientName,
    notes: data.notes,
    createdAt: new Date().toISOString()
  };
  db.projectDetails.push(detail);
  writeDb(db);
  return detail;
}

function update(id, data) {
  const db = readDb();
  const detail = db.projectDetails.find(d => d.id === id);
  if (!detail) return null;

  detail.projectId = data.projectId;
  detail.technology = data.technology;
  detail.teamSize = Number(data.teamSize) || 0;
  detail.budget = Number(data.budget) || 0;
  detail.clientName = data.clientName;
  detail.notes = data.notes;

  writeDb(db);
  return detail;
}

function remove(id) {
  const db = readDb();
  const exists = db.projectDetails.some(d => d.id === id);
  if (!exists) return false;

  db.projectDetails = db.projectDetails.filter(d => d.id !== id);
  writeDb(db);
  return true;
}

module.exports = {
  findAll,
  findById,
  findByProjectId,
  create,
  update,
  remove
};