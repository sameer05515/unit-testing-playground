const express = require("express");

const FileRelatedOperations = require("../../../common/FileRelatedOperations.services.v2");
const prepareErrorMessage = require("../../../common/prepareErrorMessage");

const router = express.Router();

const testDir = "D:\\v-dir";

const searchInJson = async (data, q, p = 1, o = 10) => (
  (d = data.filter((x) => x.isUserMessage && x.content.toLowerCase().includes(q.toLowerCase()))),
  { total: d.length, page: +p, offset: +o, results: d.slice((p - 1) * o, p * o) }
);

router.get("/:slug", async (req, res) => {
  const { slug } = req.params;

  //   try {
  //     const result = await FileRelatedOperations.searchInFiles(testDir, searchString);
  //     res.json(result);
  //   } catch (error) {
  //     const errorMessage = prepareErrorMessage(error);
  //     res.status(500).json({ error: errorMessage });
  //   }

  try {
    const { q = "", page = 1, offset = 10 } = req.query;
    const messageContentsMap = await FileRelatedOperations.readJsonFile(
      `${testDir}\\itr2\\${slug}\\messageContentsMap.json`
    );
    const result = await searchInJson(Object.values(messageContentsMap), q, page, offset);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
