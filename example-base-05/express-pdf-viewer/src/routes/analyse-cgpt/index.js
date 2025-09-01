// analyse-cgpt

const express = require("express");
const path = require("path");

const router = express.Router();

const validViewPageVersions = ["v1", "v2"];

router.get("/pages/:version", (req, res) => {
  const { version } = req.params;

  if (validViewPageVersions.includes(version)) {
    res.render(`analyse-cgpt/${version}.ejs`);
  } else {
    res.status(404).render("404.ejs", {
      errorMessage: `
        unknown version: ${version}, 
        valid 'analyse-cgpt' versions : ${validViewPageVersions.join(", ")}`,
    });
  }
});

router.get("/pages/date-wise-messages-chart/:version", (req, res) => {
  const { version } = req.params;

  res.render(`analyse-cgpt/date-wise-messages-chart.ejs`, { sVer: version });
});

router.get("/pages/month-wise-messages-chart/:version", (req, res) => {
  const { version } = req.params;

  res.render(`analyse-cgpt/month-wise-messages-chart.ejs`, { sVer: version });
});

//Hacky approach, not recommended
router.use("/api/step-1-fetch-all-snapshot-names/itr1", require("./step-1-fetch-all-snapshot-names/v1"));

// Some better approach. Good-to-go 👍
router.use("/api/step-1-fetch-all-snapshot-names/itr2", require("./step-1-fetch-all-snapshot-names/v2"));
router.use("/api/step-2-fetch-count-of-conversation/itr1", require("./step-2-fetch-count-of-conversation/itr1"));
router.use("/api/step-3-fetch-messages-of-conversation/itr1", require("./step-3-fetch-messages-of-conversation/itr1"));

router.use("/api/step-4-fetch-datewise-msg-count/itr1", require("./step-4-fetch-datewise-msg-count/itr1"));

router.use("/api/itr2/snapshots", require("./itr2/index.js"));

module.exports = router;
