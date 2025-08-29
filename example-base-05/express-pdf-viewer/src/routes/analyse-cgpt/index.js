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

//Hacky approach, not recommended
router.use("/api/step-1-fetch-all-snapshot-names/itr1", require("./step-1-fetch-all-snapshot-names/v1"));

// Some better approach. Good-to-go 👍
router.use("/api/step-1-fetch-all-snapshot-names/itr2", require("./step-1-fetch-all-snapshot-names/v2"));
router.use("/api/step-2-fetch-count-of-conversation/itr1", require("./step-2-fetch-count-of-conversation/itr1"));

router.use("/api/itr2/snapshots",require("./itr2/index.js"))

module.exports = router;
