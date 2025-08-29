const express = require("express");

const FileRelatedOperations = require("../../../common/FileRelatedOperations.services.v2");

const router = express.Router();

const testDir = "D:\\v-dir";

router.get("/:slug", async (req, res) => {
  const { slug } = req.params;
  //   res.json({
  //     content: CgptSnapshotServices.coversationNames,
  //   });
  try {
    const data = await FileRelatedOperations.readJsonFile(`${testDir}\\itr2\\${slug}\\conversations.json`);
    res.json(data.map((d) => ({ ...d, messages: d.messages.length })));
  } catch (error) {
    res.status(500).json({ error: prepareErrorMessage(error) });
  }
});

module.exports = router;
