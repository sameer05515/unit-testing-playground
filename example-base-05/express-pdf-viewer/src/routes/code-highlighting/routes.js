const express = require("express");
const fs = require("fs");
const path = require("path");
const { questions, getDetailsForSlug } = require("./questions");

const router = express.Router();

class FileRelatedOperations {
  static getFileExtension(filePath) {
    return path.extname(filePath).substring(1) || "text";
  }

  static fileExists(filePath) {
    return fs.existsSync(filePath);
  }

  static readFileContent(filePath) {
    return fs.promises.readFile(filePath, "utf8");
  }

  static readDirectory(dir, options) {
    return fs.readdirSync(dir, options);
  }

  static getFileStats(filePath) {
    return fs.statSync(filePath);
  }
}

router.get("/questions/:slug", async (req, res) => {
  const { slug } = req.params;
  const details = getDetailsForSlug(slug);
  if (!details || !details.fileAbsolutePath) {
    return res.status(404).json({ error: "Content not found" });
  }

  const filePath = details.fileAbsolutePath;

  if (!FileRelatedOperations.fileExists(filePath)) {
    return res.status(404).json({ error: "File not found" });
  }

  try {
    const content = await FileRelatedOperations.readFileContent(filePath);
    res.json({
      content,
      outputType: FileRelatedOperations.getFileExtension(filePath),
    });
  } catch (error) {
    res.status(500).json({ error: "Error reading file" });
  }
});

router.get("/:version", (req, res) => {
  const { version } = req.params;
  const validVersions = ["v1.0", "v1.0.1", "v1.1", "v1.2", "v1.2.1", "v2.0"];
  if (validVersions.includes(version)) {
    const slug = questions[0].slug;
    const details = slug ? getDetailsForSlug(slug) : null;
    res.render(`code-highlighting/${version}.ejs`, { slug, details });
  } else {
    res.status(404).render("404.ejs", {
      errorMessage: `
        unknown version: ${version}, 
        valid 'code-highlighting' versions : ${validVersions.join(", ")}`,
    });
  }
});

module.exports = router;
