const { GIT_REPO, CgptProjectRoot, CGPT_SNAPSHOT_FILE_LOCATION }=require("./constants");

const { holiSpecialLog, HoliSpecialColors } = require("./holiSpecialLog");

const printStepLog = (title = "", stepOutput = "") => {
  console.log("-------------------------------------");
  console.log(HoliSpecialColors.YELLOW, title);
  console.log(HoliSpecialColors.GREEN, stepOutput, "\n");
};

printStepLog("GIT_REPO", GIT_REPO);
printStepLog("CgptProjectRoot", CgptProjectRoot);
printStepLog("CGPT_SNAPSHOT_FILE_LOCATION", CGPT_SNAPSHOT_FILE_LOCATION);