const express = require("express");

const BaseData = require("../../../common/CgptSnapshot/BaseData");
const { JsonFileMapWithDetails } = require("../../../common/CgptSnapshot/services");
const Contants = require("../../../common/constants");
const prepareErrorMessage = require("../../../common/prepareErrorMessage");

const FileRelatedOperations = require("../../../common/FileRelatedOperations.services.v2");

const router = express.Router();

const CgptProjectRoot = Contants.CgptProjectRoot + "/public/data/conversations-10-Mar-2025.json";

const testDir = "D:\\v-dir";

router.get("/", async (req, res) => {
  const kh = [];

  for (const jj of JsonFileMapWithDetails) {
    
    if (jj?.createdBy !== "PREMENDRA") {
      continue;
    }
    const data = await FileRelatedOperations.readJsonFile(`${testDir}\\itr1\\${jj.slug}.json`);
    kh.push({ ...jj, convCount: data.convCount, totalMsgCount: data.totalMsgCount });
  }

  res.json({
    step0: BaseData,
    // step1: JsonFileMapWithDetails,
    step1:kh
  });
});

router.get("/latest-file", async (req, res) => {
  //   res.json({
  //     content: CgptSnapshotServices.coversationNames,
  //   });
  try {
    const data = await FileRelatedOperations.readJsonFile(CgptProjectRoot);
    res.json(data.length);
  } catch (error) {
    res.status(500).json({ error: prepareErrorMessage(error) });
  }
});

module.exports = router;
