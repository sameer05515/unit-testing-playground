const express = require("express");
const router = express.Router();
const { readData, writeData } = require("../utils/data");

// Get all words
router.get("/", (req, res) => {
  res.json(readData());
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
  const { index } = req.params;
  const data = readData();
  if (data[index] === undefined) return res.status(404).json({ error: "Not found" });
  data.splice(index, 1);
  writeData(data);
  res.json(data);
});

module.exports = router;
