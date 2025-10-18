//step-7-fetch-datewise-message-count

const express = require("express");

const FileRelatedOperations = require("../../../common/FileRelatedOperations.services.v2");
const prepareErrorMessage = require("../../../common/prepareErrorMessage");

const router = express.Router();

const testDir = "D:\\v-dir";

router.get("/:slug", async (req, res) => {
  const { slug } = req.params;

  try {
    const datewiseMessagesMap = await FileRelatedOperations.readJsonFile(
      `${testDir}\\itr2\\${slug}\\datewiseMessages.json`
    );
    const result = [];
    Object.keys(datewiseMessagesMap).forEach((date) => {
      result.push({ date: date, msgCount: datewiseMessagesMap[date].length || 0 });
    });
    // ✅ Sort by date descending
    const sorted = result.sort((a, b) => new Date(b.date) - new Date(a.date));
    res.json(sorted);
  } catch (error) {
    const errorMessage = prepareErrorMessage(error);
    res.status(500).json({ error: errorMessage });
  }
});

module.exports = router;
