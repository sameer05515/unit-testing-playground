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
const extractDateMetadata = (dateArray, selectedDate) => {
  const selectedIndex = dateArray.findIndex((c) => c.id === selectedDate || c.conversation_id === selectedDate);
  // const conversation = data[selectedIndex] || null;
  const nextPrev = calculateNextPrev(dateArray.length, selectedIndex);

  return {
    // conversation,
    selectedIndex,
    selectedDate,
    nextDate: dateArray[nextPrev.next]?.id || dateArray[nextPrev.next]?.conversation_id || null,
    prevDate: dateArray[nextPrev.prev]?.id || dateArray[nextPrev.prev]?.conversation_id || null,
  };
};

router.get("/:slug/:date", async (req, res) => {
  const { slug, date } = req.params;

  try {
    const datewiseMessagesMap = await FileRelatedOperations.readJsonFile(
      `${testDir}\\itr2\\${slug}\\datewiseMessages.json`
    );
    const qNas = await FileRelatedOperations.readJsonFile(`${testDir}\\itr2\\${slug}\\qNa.json`);
    const messageContentsMap = await FileRelatedOperations.readJsonFile(
      `${testDir}\\itr2\\${slug}\\messageContentsMap.json`
    );

    const messageIdsForDate = datewiseMessagesMap[date] || [];

    const result = messageIdsForDate.map((m) => ({
      q: messageContentsMap[m],
      ans: qNas[m].map((qa) => messageContentsMap[qa]),
    }));

    const metadata = extractDateMetadata(
      Object.keys(datewiseMessagesMap)
        .map((d) => ({ id: d }))
        .sort((a, b) => new Date(b.id) - new Date(a.id)),
      date
    );

    res.json({
      messages: result,
      ...metadata,
    });
  } catch (error) {
    const errorMessage = prepareErrorMessage(error);
    res.status(500).json({ error: errorMessage });
  }
});

module.exports = router;
