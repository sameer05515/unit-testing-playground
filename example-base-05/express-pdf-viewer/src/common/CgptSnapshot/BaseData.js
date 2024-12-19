const FileRelatedOperations = require("../FileRelatedOperations.services.v2");
const Contants = require("../constants");
const prepareErrorMessage = require("../prepareErrorMessage");

const filePath = Contants.CGPT_SNAPSHOT_FILE_LOCATION;

const BaseData = {
  coversationNames: [],
  LATEST_CONVERSATION_FILE: null,
  backupDirPath: "",
};

const readSnapshotBaseFile = () => {
  try {
    const content = FileRelatedOperations.readJsonFileSync(filePath);
    // return {
    BaseData.coversationNames = content?.coversationNames || [];
    BaseData.LATEST_CONVERSATION_FILE = content?.LATEST_CONVERSATION_FILE || "";
    BaseData.backupDirPath = content?.baseDir || "";
    // };
    console.log("📢 Chatgpt BaseData Loaded Successfully!");
  } catch (error) {
    throw new Error(prepareErrorMessage(error, "Error reading file from path" + filePath));
  }
};

// ✅ **Ensure the function runs before exporting values**
// (async () => {
//   await readSnapshotBaseFile();
//   console.log("📢 Chatgpt BaseData Loaded Successfully!");
// })();
readSnapshotBaseFile();

module.exports = BaseData;
