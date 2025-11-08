const express = require("express");

const FileRelatedOperations = require("../../../common/FileRelatedOperations.services.v2");
const prepareErrorMessage = require("../../../common/prepareErrorMessage");

const router = express.Router();

const testDir = "D:\\v-dir";

const getDatewiseCount = (messages) => {
  return messages
    .filter((msg) => msg.isUserMessage)
    .reduce((acc, msg) => {
      // Extract only date part (dd-MMM-yyyy)
      const date = msg.createdOn.split(" ")[0];
      if (!acc[date]) {
        acc[date] = 0;
      }
      acc[date] += 1;
      return acc;
    }, {});
};

router.get("/:slug", async (req, res) => {
  const { slug } = req.params;

  try {
    const messages = await FileRelatedOperations.readJsonFile(`${testDir}\\itr2\\${slug}\\message.json`);
    res.json(getDatewiseCount(messages));
  } catch (error) {
    res.status(500).json({ error: prepareErrorMessage(error) });
  }
});

module.exports = router;
