const express = require("express");
const router = express.Router();
const { readData, writeData } = require("../utils/data");

// Get all words
// router.get("/", (req, res) => {
//   res.json(readData());
// });

// ✅ Get paginated words
router.get("/", (req, res) => {
  let { page = 1, limit = 5, search = "" } = req.query;
  page = parseInt(page);
  limit = parseInt(limit);

  let data = readData();

  // Optional search filter
  if (search.trim()) {
    data = data.filter((w) => w.toLowerCase().includes(search.toLowerCase()));
  }

  const total = data.length;
  const start = (page - 1) * limit;
  const paginated = data.slice(start, start + limit);

  res.json({
    total,
    page,
    totalPages: Math.ceil(total / limit),
    words: paginated,
  });
});

// Add new word
router.post("/", (req, res) => {
  const { word } = req.body;
  if (!word) return res.status(400).json({ error: "Word is required" });
  const data = readData();
  data.push(word);
  writeData(data);
  res.json(data);
});

router.post("/multiple", (req, res) => {
  const { words } = req.body;
  if (!Array.isArray(words)) return res.status(400).json({ error: "Words should be an array" });
  const data = readData();
  data.push(...words);
  writeData(data);
  res.json(data);
});

// Update word
router.put("/:index", (req, res) => {
  const { index } = req.params;
  const { word } = req.body;
  const data = readData();
  if (data[index] === undefined) return res.status(404).json({ error: "Not found" });
  data[index] = word;
  writeData(data);
  res.json(data);
});

// Delete word
router.delete("/:index", (req, res) => {
  let { index } = req.params;
  index = parseInt(index, 10);
  let data = readData();
  if (isNaN(index) || index < 0 || index >= data.length) {
    return res.status(404).json({ error: "Not found" });
  }
  // Remove the word at the given index
  data.splice(index, 1);
  // Write the updated array as a full replacement
  fs = require("fs");
  path = require("path");
  const DATA_FILE = path.join(__dirname, "../data.json");
  fs.writeFileSync(DATA_FILE, JSON.stringify(data));
  res.json(data);
});

module.exports = router;
