const { holiSpecialLog, HoliSpecialColors } = require("./holiSpecialLog");

const printStepLog = (title = "", stepOutput = "") => {
  console.log("-------------------------------------");
  console.log(HoliSpecialColors.YELLOW, title);
  console.log(HoliSpecialColors.GREEN, stepOutput, "\n");
};

module.exports={printStepLog}