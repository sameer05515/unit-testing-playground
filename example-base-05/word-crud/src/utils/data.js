const fs = require("fs");
const path = require("path");

const DATA_FILE = path.join(__dirname, "../data.json");

function readData() {
  if (!fs.existsSync(DATA_FILE)) return [];
  return JSON.parse(fs.readFileSync(DATA_FILE, "utf8") || "[]");
}

function writeData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data));
}

module.exports = { readData, writeData };
