const express = require("express");
const router = express.Router();
const { readData, writeData } = require("../utils/data");
const fs = require("fs");
const path = require("path");

/**
 * @swagger
 * tags:
 *   name: Words
 *   description: Word management API
 */

/**
 * @swagger
 * /words:
 *   get:
 *     summary: Get paginated words
 *     tags: [Words]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 5
 *         description: Number of items per page
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search query (optional)
 *     responses:
 *       200:
 *         description: List of words
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total:
 *                   type: integer
 *                 page:
 *                   type: integer
 *                 totalPages:
 *                   type: integer
 *                 words:
 *                   type: array
 *                   items:
 *                     type: string
 */
router.get("/", (req, res) => {
  let { page = 1, limit = 5, search = "" } = req.query;
  page = parseInt(page);
  limit = parseInt(limit);

  let data = readData();

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

/**
 * @swagger
 * /words:
 *   post:
 *     summary: Add a new word
 *     tags: [Words]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               word:
 *                 type: string
 *                 example: "hello"
 *     responses:
 *       200:
 *         description: Word added successfully
 */
router.post("/", (req, res) => {
  const { word } = req.body;
  if (!word) return res.status(400).json({ error: "Word is required" });
  const data = readData();
  data.push(word);
  writeData(data);
  res.json(data);
});

/**
 * @swagger
 * /words/multiple:
 *   post:
 *     summary: Add multiple words at once
 *     tags: [Words]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               words:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["one", "two", "three"]
 *     responses:
 *       200:
 *         description: Words added successfully
 */
router.post("/multiple", (req, res) => {
  const { words } = req.body;
  if (!Array.isArray(words)) return res.status(400).json({ error: "Words should be an array" });
  const data = readData();
  data.push(...words);
  writeData(data);
  res.json(data);
});

/**
 * @swagger
 * /words/{index}:
 *   put:
 *     summary: Update a word by index
 *     tags: [Words]
 *     parameters:
 *       - in: path
 *         name: index
 *         required: true
 *         schema:
 *           type: integer
 *         description: Word index
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               word:
 *                 type: string
 *                 example: "updated"
 *     responses:
 *       200:
 *         description: Word updated successfully
 */
router.put("/:index", (req, res) => {
  const { index } = req.params;
  const { word } = req.body;
  const data = readData();
  if (data[index] === undefined) return res.status(404).json({ error: "Not found" });
  data[index] = word;
  writeData(data);
  res.json(data);
});

/**
 * @swagger
 * /words/{index}:
 *   delete:
 *     summary: Delete a word by index
 *     tags: [Words]
 *     parameters:
 *       - in: path
 *         name: index
 *         required: true
 *         schema:
 *           type: integer
 *         description: Word index to delete
 *     responses:
 *       200:
 *         description: Word deleted successfully
 */
router.delete("/:index", (req, res) => {
  let { index } = req.params;
  index = parseInt(index, 10);
  let data = readData();
  if (isNaN(index) || index < 0 || index >= data.length) {
    return res.status(404).json({ error: "Not found" });
  }
  data.splice(index, 1);
  const DATA_FILE = path.join(__dirname, "../data.json");
  fs.writeFileSync(DATA_FILE, JSON.stringify(data));
  res.json(data);
});

module.exports = router;
