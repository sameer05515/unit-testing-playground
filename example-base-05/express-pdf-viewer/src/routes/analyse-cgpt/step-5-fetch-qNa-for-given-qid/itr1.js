const express = require("express");

const FileRelatedOperations = require("../../../common/FileRelatedOperations.services.v2");
const prepareErrorMessage = require("../../../common/prepareErrorMessage");

const router = express.Router();

const testDir = "D:\\v-dir";


router.get("/:slug/:convId/:qId", async (req, res) => {
  const { slug, convId,qId } = req.params;

  try {
    // const conversations = await FileRelatedOperations.readJsonFile(`${testDir}\\itr2\\${slug}\\conversations.json`);
    const qNas = await FileRelatedOperations.readJsonFile(`${testDir}\\itr2\\${slug}\\qNa.json`);
    const messages = await FileRelatedOperations.readJsonFile(`${testDir}\\itr2\\${slug}\\message.json`);

    const messageContents = await FileRelatedOperations.readJsonFile(
      `${testDir}\\itr2\\${slug}\\message.contents.json`
    );
    const messageContentsMap = {};
    messageContents.forEach((mc) => {
      messageContentsMap[mc.id] = { ...mc, ...messages.find((msg) => msg.id === mc.id) };
    });

    // const conv = conversations.find((c) => c.id === convId);
    // conv.messages = conv.messages.map((m) => ({
    //   q: messageContentsMap[m],
    //   ans: qNas[m].map((qa) => messageContentsMap[qa]),
    // }));

    // const { selectedIndex, nextConversationId, prevConversationId } = extractConversationMetadata(
    //   conversations,
    //   convId
    // );

    const quesObj={
        q:  messageContentsMap[qId],
        ans: qNas[qId].map((qa) => messageContentsMap[qa]),
    }
    res.json(quesObj);
  } catch (error) {
    res.status(500).json({ error: prepareErrorMessage(error) });
  }
});


module.exports = router;