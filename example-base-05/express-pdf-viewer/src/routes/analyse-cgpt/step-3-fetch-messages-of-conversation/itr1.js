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
    // Disable caching to ensure fresh data on every request
    const conversations = await FileRelatedOperations.readJsonFile(`${testDir}\\itr2\\${slug}\\conversations.json`, false);
    const qNas = await FileRelatedOperations.readJsonFile(`${testDir}\\itr2\\${slug}\\qNa.json`, false);
    // const messages = await FileRelatedOperations.readJsonFile(`${testDir}\\itr2\\${slug}\\message.json`);

    // const messageContents = await FileRelatedOperations.readJsonFile(
    //   `${testDir}\\itr2\\${slug}\\message.contents.json`
    // );
    // const messageContentsMap = {};
    // messageContents.forEach((mc) => {
    //   messageContentsMap[mc.id] = { ...mc, ...messages.find((msg) => msg.id === mc.id) };
    // });

    const messageContentsMap = await FileRelatedOperations.readJsonFile(`${testDir}\\itr2\\${slug}\\messageContentsMap.json`, false);

    const conv = conversations.find((c) => c.id === convId);
    
    if (!conv) {
      return res.status(404).json({ error: `Conversation with id ${convId} not found` });
    }

    if (!conv.messages || !Array.isArray(conv.messages)) {
      return res.status(400).json({ error: 'Conversation messages data is invalid' });
    }

    // Map messages with proper null handling
    conv.messages = conv.messages.map((m) => {
      const questionContent = messageContentsMap[m];
      const answerIds = qNas[m] || [];
      const answers = answerIds
        .map((qa) => messageContentsMap[qa])
        .filter((ans) => ans !== undefined && ans !== null);

      return {
        id: m, // Include message ID for reference
        q: questionContent || null,
        ans: answers,
      };
    });

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
