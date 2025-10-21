const express = require("express");
const FileRelatedOperations = require("../../../common/FileRelatedOperations.services.v2");
const prepareErrorMessage = require("../../../common/prepareErrorMessage");

const router = express.Router();

// Constants
const TEST_DIR = "D:\\v-dir"; // Base directory for data files

/**
 * Calculate next and previous indices in a circular array
 * @param {number} dataLength - Total length of the array
 * @param {number} index - Current index
 * @returns {{ next: number, prev: number }} Next and previous indices
 */
const getCircularIndices = (dataLength, index) => {
  if (index < 0 || dataLength <= 0) {
    return { next: -1, prev: -1 };
  }
  return {
    next: (index + 1) % dataLength,
    prev: (index - 1 + dataLength) % dataLength
  };
};

/**
 * Extract metadata for date navigation
 * @param {Array<{id: string}>} dates - Array of date objects
 * @param {string} selectedDate - Currently selected date
 * @returns {Object} Navigation metadata
 */
const getDateNavigationMetadata = (dates, selectedDate) => {
  const selectedIndex = dates.findIndex(d => d.id === selectedDate);
  const { next, prev } = getCircularIndices(dates.length, selectedIndex);

  return {
    selectedIndex,
    selectedDate,
    nextDate: dates[next]?.id ?? null,
    prevDate: dates[prev]?.id ?? null,
    totalDates: dates.length
  };
};

/**
 * Get messages for a specific date
 * @param {string} slug - Project identifier
 * @param {string} date - Target date
 */
router.get("/:slug/:date", async (req, res) => {
  const { slug, date } = req.params;

  try {
    // Load all required data files in parallel
    const [datewiseMessages, qNas, messageContents] = await Promise.all([
      FileRelatedOperations.readJsonFile(`${TEST_DIR}\\itr2\\${slug}\\datewiseMessages.json`),
      FileRelatedOperations.readJsonFile(`${TEST_DIR}\\itr2\\${slug}\\qNa.json`),
      FileRelatedOperations.readJsonFile(`${TEST_DIR}\\itr2\\${slug}\\messageContentsMap.json`)
    ]);

    // Get messages for the specified date
    const messageIds = datewiseMessages[date] || [];
    
    // Format message data with questions and answers
    const messages = messageIds.map(messageId => ({
      q: messageContents[messageId],
      ans: (qNas[messageId] || []).map(answerId => messageContents[answerId])
    }));

    // Get navigation metadata
    const sortedDates = Object.keys(datewiseMessages)
      .map(d => ({ id: d }))
      .sort((a, b) => new Date(b.id) - new Date(a.id));

    const metadata = getDateNavigationMetadata(sortedDates, date);

    res.json({
      messages,
      msgCount: messageIds.length,
      ...metadata
    });

  } catch (error) {
    res.status(500).json({ 
      error: prepareErrorMessage(error) 
    });
  }
});

module.exports = router;
