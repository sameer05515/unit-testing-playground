const express = require("express");

const FileRelatedOperations = require("../../../common/FileRelatedOperations.services.v2");

const router = express.Router();

const testDir = "D:\\v-dir";

router.get("/:slug/:convId", async (req, res) => {
  const { slug, convId } = req.params;
  //   res.json({
  //     content: CgptSnapshotServices.coversationNames,
  //   });
  try {
    const data = await FileRelatedOperations.readJsonFile(`${testDir}\\itr2\\${slug}\\conversations.json`);
    res.json(data.find((d) => d.id === convId));
  } catch (error) {
    res.status(500).json({ error: prepareErrorMessage(error) });
  }
});

module.exports = router;
