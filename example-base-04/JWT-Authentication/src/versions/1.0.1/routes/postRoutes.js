const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/authenticateToken");
const { getPosts } = require("../controllers/postController");

// Apply authentication middleware
router.get("/posts", authenticateToken, getPosts);

module.exports = router;
