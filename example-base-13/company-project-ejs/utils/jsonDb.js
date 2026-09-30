const fs = require("fs");
const path = require("path");

const DB_FILE = path.join(__dirname, "..", "data", "data.json");

function readDb() {
  return JSON.parse(fs.readFileSync(DB_FILE, "utf8"));
}

function writeDb(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

function generateId(prefix) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

module.exports = {
  readDb,
  writeDb,
  generateId
};