const express = require("express");
const path = require("path");

const router = express.Router();

const BaseData = require("../../../common/CgptSnapshot/BaseData");
const { JsonFileMapWithDetails } = require("../../../common/CgptSnapshot/services");
const Constants = require("../../../common/constants");
const prepareErrorMessage = require("../../../common/prepareErrorMessage");
const FileOps = require("../../../common/FileRelatedOperations.services.v2");

// Constants
const testDir = "D:\\v-dir";

router.get("/s/:sVer", async (req, res) => {
  try {
    const { sVer } = req.params;
    const filePath = `${testDir}\\itr1\\${sVer}.json`;
    const data = await FileOps.readJsonFile(filePath);

    // res.json(data);

    if (req.accepts("html")) {
      res.render(`chat-renderer/v5.1.conv.ejs`, {
        data: data.conversations.map((c) => ({ id: c.id, title: c.title, msgCount: c.msgCount })),
        sVer
      });
    } else {
      res.json(data.conversations.map((c) => ({ id: c.id, title: c.title, msgCount: c.msgCount })));
    }
  } catch (err) {
    const errorMessage = prepareErrorMessage(err);
    res.status(500).json({ error: errorMessage });
  }
});

// Route: GET /
router.get("/", async (req, res) => {
  try {
    const resultList = [];

    for (const fileDetail of JsonFileMapWithDetails) {
      if (fileDetail?.createdBy !== "PREMENDRA") continue;

      const filePath = `${testDir}\\itr1\\${fileDetail.slug}.json`;
      const data = await FileOps.readJsonFile(filePath);

      resultList.push({
        ...fileDetail,
        convCount: data.convCount,
        totalMsgCount: data.totalMsgCount,
      });
    }

    if (req.accepts("html")) {
      res.render(`chat-renderer/v5.1.ejs`, { message: resultList });
    } else {
      res.json(resultList);
    }
  } catch (err) {
    const errorMessage = prepareErrorMessage(err);
    res.status(500).json({ error: errorMessage });
  }
});

module.exports = router;
