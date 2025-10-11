const fs = require("fs");
const path = require("path");

const DATA_FILE = path.join(__dirname, "../data.json");

function readData() {
  if (!fs.existsSync(DATA_FILE)) return [];
  return JSON.parse(fs.readFileSync(DATA_FILE, "utf8") || "[]");
}

function writeData(newData) {
  // Read existing data
  let existing = [];
  if (fs.existsSync(DATA_FILE)) {
    existing = JSON.parse(fs.readFileSync(DATA_FILE, "utf8") || "[]");
  }
  // Convert all to lowercase
  const allWords = [...existing, ...newData].map((w) => (typeof w === "string" ? w.toLowerCase() : w));
  // Deduplicate based on lowercase, filter falsy, sort
  const unique = Array.from(new Set(allWords))
    .filter(Boolean)
    .sort((a, b) => a.localeCompare(b));
  fs.writeFileSync(DATA_FILE, JSON.stringify(unique));
}

module.exports = { readData, writeData };
