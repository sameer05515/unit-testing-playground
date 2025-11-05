const express = require("express");
const { param } = require("express-validator");

const FileRelatedOperations = require("../../../common/FileRelatedOperations.services.v2");
const prepareErrorMessage = require("../../../common/prepareErrorMessage");
const Contants = require("../../../common/constants");
const asyncHandler = require("../../../middleware/asyncHandler");
const { validate, sanitizePath } = require("../../../middleware/validation");

const router = express.Router();

const testDir = Contants.TEST_DIR || "D:\\v-dir";

// Validation middleware
const validateParams = [
  param('slug').trim().notEmpty().withMessage('Slug is required'),
  param('convId').trim().notEmpty().withMessage('Conversation ID is required'),
  param('qId').trim().notEmpty().withMessage('Question ID is required'),
  validate
];

router.get("/:slug/:convId/:qId", validateParams, asyncHandler(async (req, res) => {
  const { slug, convId, qId } = req.params;

  // Sanitize slug to prevent directory traversal
  try {
    sanitizePath(testDir, slug);
  } catch (error) {
    throw new Error('Invalid slug parameter: ' + error.message);
  }

  const qNasPath = `${testDir}\\itr2\\${slug}\\qNa.json`;
  const messageContentsMapPath = `${testDir}\\itr2\\${slug}\\messageContentsMap.json`;

  // Validate file paths
  if (!FileRelatedOperations.fileExists(qNasPath)) {
    throw new Error(`QNA file not found for slug: ${slug}`);
  }

  if (!FileRelatedOperations.fileExists(messageContentsMapPath)) {
    throw new Error(`Message contents file not found for slug: ${slug}`);
  }

  const [qNas, messageContentsMap] = await Promise.all([
    FileRelatedOperations.readJsonFile(qNasPath),
    FileRelatedOperations.readJsonFile(messageContentsMapPath)
  ]);

  // Validate that qId exists
  if (!qNas[qId]) {
    throw new Error(`Question ID ${qId} not found`);
  }

  if (!messageContentsMap[qId]) {
    throw new Error(`Message content for ${qId} not found`);
  }

  const quesObj = {
    q: messageContentsMap[qId],
    ans: (qNas[qId] || []).map((qa) => messageContentsMap[qa] || null).filter(Boolean),
  };

  res.json(quesObj);
}));

module.exports = router;