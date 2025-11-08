const holiSpecialLog = () => {
  console.log("\x1b[31m%s\x1b[0m", "ई लाले रंग के message बा!", "RED");
  console.log("\x1b[32m%s\x1b[0m", "ई हरियर (Green) रंग के message बा!", "Green");
  console.log("\x1b[34m%s\x1b[0m", "ई नीला (Blue) रंग के message बा!", "Blue");
  console.log("\x1b[35m%s\x1b[0m", "ई गुलाबी (Magenta) रंग के message बा!", "Magenta");
  console.log("\x1b[33m%s\x1b[0m", "ई पीयर (Yellow) रंग के message बा!", "Yellow");
  console.log("\x1b[31m%s\x1b[0m", "💥 रंग बरसे... LAL Debugger से! 🔴", "RED");
  console.log("\x1b[32m%s\x1b[0m", "🌿 अब हरियर Warning बा! 🟢", "Green");
  console.log("\x1b[33m%s\x1b[0m", "⚠️  पीयर रंग में Caution बा! 🟡", "Yellow");
  console.log("\x1b[35m%s\x1b[0m", "💜 गुलाबी Bug Fix करा हो बाबू! 🟣", "Magenta");
  console.log("\x1b[36m%s\x1b[0m", "💙 Cyan रंग में Success बा! 🔵", "Cyan");
};

const HoliSpecialColors = {
  RED: "\x1b[31m%s\x1b[0m",
  GREEN: "\x1b[32m%s\x1b[0m",
  BLUE: "\x1b[34m%s\x1b[0m",
  MAGENTA: "\x1b[35m%s\x1b[0m",
  YELLOW: "\x1b[33m%s\x1b[0m",
  CYAN: "\x1b[36m%s\x1b[0m",
};

module.exports = { holiSpecialLog, HoliSpecialColors };
