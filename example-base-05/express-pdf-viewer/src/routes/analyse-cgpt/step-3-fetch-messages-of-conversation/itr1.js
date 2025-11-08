const express = require("express");

const FileRelatedOperations = require("../../../common/FileRelatedOperations.services.v2");
const prepareErrorMessage = require("../../../common/prepareErrorMessage");

const router = express.Router();

const testDir = "D:\\v-dir";

const calculateNextPrev = (dataLength, index) => {
  if (index < 0 || dataLength <= 0) return { next: -1, prev: -1 };
  return {
    next: (index + 1 + dataLength) % dataLength,
    prev: (index - 1 + dataLength) % dataLength,
  };
};

// Extract conversation metadata
const extractConversationMetadata = (data, conversationId) => {
  const selectedIndex = data.findIndex((c) => c.id === conversationId || c.conversation_id === conversationId);
  // const conversation = data[selectedIndex] || null;
  const nextPrev = calculateNextPrev(data.length, selectedIndex);

  return {
    // conversation,
    selectedIndex,
    nextConversationId: data[nextPrev.next]?.id || data[nextPrev.next]?.conversation_id || null,
    prevConversationId: data[nextPrev.prev]?.id || data[nextPrev.prev]?.conversation_id || null,
  };
};

router.get("/:slug/:convId", async (req, res) => {
  const { slug, convId } = req.params;

  try {
    const conversations = await FileRelatedOperations.readJsonFile(`${testDir}\\itr2\\${slug}\\conversations.json`);
    const qNas = await FileRelatedOperations.readJsonFile(`${testDir}\\itr2\\${slug}\\qNa.json`);
    // const messages = await FileRelatedOperations.readJsonFile(`${testDir}\\itr2\\${slug}\\message.json`);

    // const messageContents = await FileRelatedOperations.readJsonFile(
    //   `${testDir}\\itr2\\${slug}\\message.contents.json`
    // );
    // const messageContentsMap = {};
    // messageContents.forEach((mc) => {
    //   messageContentsMap[mc.id] = { ...mc, ...messages.find((msg) => msg.id === mc.id) };
    // });

    const messageContentsMap = await FileRelatedOperations.readJsonFile(`${testDir}\\itr2\\${slug}\\messageContentsMap.json`);

    const conv = conversations.find((c) => c.id === convId);
    conv.messages = conv.messages.map((m) => ({
      q: messageContentsMap[m],
      ans: qNas[m].map((qa) => messageContentsMap[qa]),
    }));

    const { selectedIndex, nextConversationId, prevConversationId } = extractConversationMetadata(
      conversations,
      convId
    );
    res.json({
      ...conv,
      selectedIndex,
      next: nextConversationId,
      prev: prevConversationId,
      totalConv: conversations.length,
    });
  } catch (error) {
    res.status(500).json({ error: prepareErrorMessage(error) });
  }
});

module.exports = router;
