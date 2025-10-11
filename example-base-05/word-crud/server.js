const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();

const PORT = 3030;
const DATA_FILE = path.join(__dirname, "data.json");

app.use(express.json());
app.use(express.static("public"));

// Helper: read/write JSON
function readData() {
  if (!fs.existsSync(DATA_FILE)) return [];
  return JSON.parse(fs.readFileSync(DATA_FILE, "utf8") || "[]");
}

function writeData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

// Get all words
app.get("/api/words", (req, res) => {
  res.json(readData());
});

// Add new word
app.post("/api/words", (req, res) => {
  const { word } = req.body;
  if (!word) return res.status(400).json({ error: "Word is required" });
  const data = readData();
  data.push(word);
  writeData(data);
  res.json(data);
});

// Update word
app.put("/api/words/:index", (req, res) => {
  const { index } = req.params;
  const { word } = req.body;
  const data = readData();
  if (data[index] === undefined) return res.status(404).json({ error: "Not found" });
  data[index] = word;
  writeData(data);
  res.json(data);
});

// Delete word
app.delete("/api/words/:index", (req, res) => {
  const { index } = req.params;
  const data = readData();
  if (data[index] === undefined) return res.status(404).json({ error: "Not found" });
  data.splice(index, 1);
  writeData(data);
  res.json(data);
});

app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
