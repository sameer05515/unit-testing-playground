const express = require("express");

const FileRelatedOperations = require("../../../common/FileRelatedOperations.services.v2");
const prepareErrorMessage = require("../../../common/prepareErrorMessage");

const router = express.Router();

const testDir = "D:\\v-dir";

router.get("/:slug/:date", async (req, res) => {
  const { slug, date } = req.params;

  try {
    const datewiseMessagesMap = await FileRelatedOperations.readJsonFile(
      `${testDir}\\itr2\\${slug}\\datewiseMessages.json`
    );
    const qNas = await FileRelatedOperations.readJsonFile(`${testDir}\\itr2\\${slug}\\qNa.json`);
    const messageContentsMap = await FileRelatedOperations.readJsonFile(`${testDir}\\itr2\\${slug}\\messageContentsMap.json`);


    const messageIdsForDate = datewiseMessagesMap[date] || [];

    const result = messageIdsForDate.map((m) => ({
      q: messageContentsMap[m],
      ans: qNas[m].map((qa) => messageContentsMap[qa]),
    }));
    res.json(result);
  } catch (error) {
    const errorMessage = prepareErrorMessage(error);
    res.status(500).json({ error: errorMessage });
  }
});


module.exports = router;