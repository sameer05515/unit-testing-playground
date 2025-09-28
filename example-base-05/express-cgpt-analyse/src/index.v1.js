const { GIT_REPO, CgptProjectRoot, CGPT_SNAPSHOT_FILE_LOCATION }=require("./constants");
const {printStepLog}=require("./printStepLog");


printStepLog("GIT_REPO", GIT_REPO);
printStepLog("CgptProjectRoot", CgptProjectRoot);
printStepLog("CGPT_SNAPSHOT_FILE_LOCATION", CGPT_SNAPSHOT_FILE_LOCATION);