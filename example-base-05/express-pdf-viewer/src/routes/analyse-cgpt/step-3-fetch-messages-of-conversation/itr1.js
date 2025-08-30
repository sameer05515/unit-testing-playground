const express = require("express");

const FileRelatedOperations = require("../../../common/FileRelatedOperations.services.v2");

const router = express.Router();

const testDir = "D:\\v-dir";

router.get("/:slug/:convId", async (req, res) => {
  const { slug, convId } = req.params;

  try {
    const conversations = await FileRelatedOperations.readJsonFile(`${testDir}\\itr2\\${slug}\\conversations.json`);
    const qNas = await FileRelatedOperations.readJsonFile(`${testDir}\\itr2\\${slug}\\qNa.json`);
    const messageContents = await FileRelatedOperations.readJsonFile(
      `${testDir}\\itr2\\${slug}\\message.contents.json`
    );
    const messageContentsMap = {};
    messageContents.forEach((mc) => {
      messageContentsMap[mc.id] = mc;
    });
    const conv = conversations.find((c) => c.id === convId);
    conv.messages = conv.messages.map((m) => ({
      q: messageContentsMap[m],
      ans: qNas[m].map((qa) => messageContentsMap[qa]),
    }));
    res.json(conv);
  } catch (error) {
    res.status(500).json({ error: prepareErrorMessage(error) });
  }
});

module.exports = router;
