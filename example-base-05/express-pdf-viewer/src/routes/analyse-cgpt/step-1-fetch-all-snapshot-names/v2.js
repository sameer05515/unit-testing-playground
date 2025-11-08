const express = require("express");
const { param, query } = require("express-validator");

const BaseData = require("../../../common/CgptSnapshot/BaseData");
const { JsonFileMapWithDetails } = require("../../../common/CgptSnapshot/services");
const Contants = require("../../../common/constants");
const prepareErrorMessage = require("../../../common/prepareErrorMessage");
const FileRelatedOperations = require("../../../common/FileRelatedOperations.services.v2");
const JsonOptimizer = require("../../../common/JsonOptimizer");
const asyncHandler = require("../../../middleware/asyncHandler");
const { validate } = require("../../../middleware/validation");

const router = express.Router();

const CgptProjectRoot = Contants.CgptProjectRoot + "/public/data/conversations-10-Mar-2025.json";

const testDir = Contants.TEST_DIR || "D:\\v-dir";

router.get("/", asyncHandler(async (req, res) => {
  const kh = [];

  for (const jj of JsonFileMapWithDetails) {
    if (jj?.createdBy !== "PREMENDRA") {
      continue;
    }
    const indexFilePath = `${testDir}\\itr2\\${jj.slug}\\index.json`;
    
    // Use optimizer to check file size before reading
    if (JsonOptimizer.shouldChunk(indexFilePath)) {
      console.warn(`Large file detected: ${indexFilePath} (${JsonOptimizer.getFileSize(indexFilePath)})`);
    }
    
    const data = await FileRelatedOperations.readJsonFile(indexFilePath);
    kh.push({ ...jj, convCount: data.convCount, totalMsgCount: data.totalMsgCount });
  }

  res.json({
    step0: BaseData,
    step1: kh
  });
}));

router.get("/latest-file", asyncHandler(async (req, res) => {
  try {
    // Use JsonOptimizer for large file handling
    const data = await JsonOptimizer.readJsonFile(CgptProjectRoot);
    
    if (!JsonOptimizer.validateJsonStructure(data, 'array')) {
      throw new Error('Invalid JSON structure: expected array');
    }
    
    res.json({ count: data.length, fileSize: JsonOptimizer.getFileSize(CgptProjectRoot) });
  } catch (error) {
    throw new Error(prepareErrorMessage(error, 'Failed to read latest file'));
  }
}));

module.exports = router;
