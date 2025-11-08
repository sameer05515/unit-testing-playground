const fs = require("fs");
const path = require("path");

const DATA_FILE = path.join(__dirname, "../data.json");

// Utility method: Reads JSON file safely and parses it, returns defaultValue if not existing or invalid
function readJsonFileSync(filePath, defaultValue = []) {
  if (!fs.existsSync(filePath)) return defaultValue;
  try {
    const data = fs.readFileSync(filePath, "utf8");
    return data ? JSON.parse(data) : defaultValue;
  } catch {
    return defaultValue;
  }
}

// Utility method: Converts to lowercase if string, identity otherwise
function toLowerSafe(val) {
  return typeof val === "string" ? val.toLowerCase() : val;
}

// Utility method: Deduplicate, filter falsy, and sort case-insensitive
function dedupeFilterSort(words) {
  return Array.from(new Set(words.map(toLowerSafe)))
    .filter(Boolean)
    .sort((a, b) => a.localeCompare(b));
}

function readData() {
  return readJsonFileSync(DATA_FILE, []);
}

function writeData(newData) {
  const existing = readJsonFileSync(DATA_FILE, []);
  const allWords = [...existing, ...newData];
  const unique = dedupeFilterSort(allWords);
  fs.writeFileSync(DATA_FILE, JSON.stringify(unique));
}

module.exports = { readData, writeData };
