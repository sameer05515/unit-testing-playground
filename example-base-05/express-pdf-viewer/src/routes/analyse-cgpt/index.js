// analyse-cgpt

const express = require("express");
const path = require("path");

/**
 * @swagger
 * tags:
 *   name: AnalyseCgpt
 *   description: Endpoints for the analyse-cgpt feature
 */

const router = express.Router();

const validViewPageVersions = ["v1", "v2"];

/**
 * @swagger
 * /analyse-cgpt/pages/{version}:
 *   get:
 *     summary: Render the analyse-cgpt page for the given version.
 *     tags: [AnalyseCgpt]
 *     parameters:
 *       - in: path
 *         name: version
 *         required: true
 *         schema:
 *           type: string
 *           enum: [v1, v2]
 *         description: Version of the analyse-cgpt page
 *     responses:
 *       200:
 *         description: The requested page was rendered successfully.
 *       404:
 *         description: Unknown version specified.
 */
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

/**
 * @swagger
 * /analyse-cgpt/pages/date-wise-messages-chart/{version}:
 *   get:
 *     summary: Render date-wise messages chart page for a given version.
 *     tags: [AnalyseCgpt]
 *     parameters:
 *       - in: path
 *         name: version
 *         required: true
 *         schema:
 *           type: string
 *         description: Version for the chart page
 *     responses:
 *       200:
 *         description: The chart page was rendered successfully.
 */
router.get("/pages/date-wise-messages-chart/:version", (req, res) => {
  const { version } = req.params;

  res.render(`analyse-cgpt/date-wise-messages-chart.ejs`, { sVer: version });
});

/**
 * @swagger
 * /analyse-cgpt/pages/month-wise-messages-chart/{version}:
 *   get:
 *     summary: Render month-wise messages chart page for a given version.
 *     tags: [AnalyseCgpt]
 *     parameters:
 *       - in: path
 *         name: version
 *         required: true
 *         schema:
 *           type: string
 *         description: Version for the chart page
 *     responses:
 *       200:
 *         description: The chart page was rendered successfully.
 */
router.get("/pages/month-wise-messages-chart/:version", (req, res) => {
  const { version } = req.params;

  res.render(`analyse-cgpt/month-wise-messages-chart.ejs`, { sVer: version });
});

/**
 * @swagger
 * /analyse-cgpt/pages/search-string-questions/v1:
 *   get:
 *     summary: Render the search string questions page for v1.
 *     tags: [AnalyseCgpt]
 *     responses:
 *       200:
 *         description: The page was rendered successfully.
 */
router.get("/pages/search-string-questions/v1", (req, res) => {
  res.render("analyse-cgpt/search-string-questions.ejs", {
    sVer: "v1",
  });
});

//Hacky approach, not recommended
/**
 * @swagger
 * /analyse-cgpt/api/step-1-fetch-all-snapshot-names/itr1:
 *   use:
 *     summary: Step 1 API, iteration 1 (not recommended).
 *     tags: [AnalyseCgpt]
 */
router.use("/api/step-1-fetch-all-snapshot-names/itr1", require("./step-1-fetch-all-snapshot-names/v1"));

// Some better approach. Good-to-go 👍
/**
 * @swagger
 * /analyse-cgpt/api/step-1-fetch-all-snapshot-names/itr2:
 *   use:
 *     summary: Step 1 API, iteration 2.
 *     tags: [AnalyseCgpt]
 */
router.use("/api/step-1-fetch-all-snapshot-names/itr2", require("./step-1-fetch-all-snapshot-names/v2"));

/**
 * @swagger
 * /analyse-cgpt/api/step-2-fetch-count-of-conversation/itr1:
 *   use:
 *     summary: Step 2 API.
 *     tags: [AnalyseCgpt]
 */
router.use("/api/step-2-fetch-count-of-conversation/itr1", require("./step-2-fetch-count-of-conversation/itr1"));

/**
 * @swagger
 * /analyse-cgpt/api/step-3-fetch-messages-of-conversation/itr1:
 *   use:
 *     summary: Step 3 API.
 *     tags: [AnalyseCgpt]
 */
router.use("/api/step-3-fetch-messages-of-conversation/itr1", require("./step-3-fetch-messages-of-conversation/itr1"));

/**
 * @swagger
 * /analyse-cgpt/api/step-4-fetch-datewise-msg-count/itr1:
 *   use:
 *     summary: Step 4 API.
 *     tags: [AnalyseCgpt]
 */
router.use("/api/step-4-fetch-datewise-msg-count/itr1", require("./step-4-fetch-datewise-msg-count/itr1"));

/**
 * @swagger
 * /analyse-cgpt/api/step-5-fetch-qNa-for-given-qid/itr1:
 *   use:
 *     summary: Step 5 API.
 *     tags: [AnalyseCgpt]
 */
router.use("/api/step-5-fetch-qNa-for-given-qid/itr1", require("./step-5-fetch-qNa-for-given-qid/itr1"));

/**
 * @swagger
 * /analyse-cgpt/api/step-6-fetch-message-for-given-mid/itr1:
 *   use:
 *     summary: Step 6 API.
 *     tags: [AnalyseCgpt]
 */
router.use("/api/step-6-fetch-message-for-given-mid/itr1", require("./step-6-fetch-message-for-given-mid/itr1"));

/**
 * @swagger
 * /analyse-cgpt/api/step-7-fetch-datewise-message-count/itr1:
 *   use:
 *     summary: Step 7 API.
 *     tags: [AnalyseCgpt]
 */
router.use("/api/step-7-fetch-datewise-message-count/itr1", require("./step-7-fetch-datewise-message-count/itr1"));

/**
 * @swagger
 * /analyse-cgpt/api/step-8-fetch-messages-for-date/itr1:
 *   use:
 *     summary: Step 8 API.
 *     tags: [AnalyseCgpt]
 */
router.use("/api/step-8-fetch-messages-for-date/itr1", require("./step-8-fetch-messages-for-date/itr1"));

/**
 * @swagger
 * /analyse-cgpt/api/step-9-search-string-questions/itr1:
 *   use:
 *     summary: Step 9 API.
 *     tags: [AnalyseCgpt]
 */
router.use("/api/step-9-search-string-questions/itr1", require("./step-9-search-string-questions/itr1"));

/**
 * @swagger
 * /analyse-cgpt/api/itr2/snapshots:
 *   use:
 *     summary: Snapshots API for iteration 2.
 *     tags: [AnalyseCgpt]
 */
router.use("/api/itr2/snapshots", require("./itr2/index.js"));

module.exports = router;
