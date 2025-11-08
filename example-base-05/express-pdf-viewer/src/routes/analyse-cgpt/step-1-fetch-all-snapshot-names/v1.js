const express = require("express");
const path = require("path");
const fs = require("fs");
const vm = require("vm");

const router = express.Router();

// Absolute path of snapshots.js (Update this path as per your system)
const filePath =
  "D:/GIT/microservices-playground/example-base-03/fontend/chat-gpt-conversation/src/common/utils/constants.js";

router.get("/", (req, res) => {
  fs.readFile(filePath, "utf8", (err, fileContent) => {
    if (err) {
      console.error("Error reading file:", err);
      return res.status(500).json({ error: "Failed to read snapshots.js" });
    }

    try {
      // 🔄 Convert `export const` to `const`
      const modifiedContent = fileContent
        .replace(/export const /g, "const ") // Replace "export const" with "const"
        .replace(/export default /g, "const defaultExport = "); // Handle default export

      console.log("fileContent", fileContent);
      console.log("modifiedContent", modifiedContent);

      // 🔬 Create a sandbox & execute the transformed script
      const sandbox = {};
      vm.createContext(sandbox);
      vm.runInContext(modifiedContent, sandbox);

      // ✅ Extract the variables from the sandbox
      const { coversationNames, LATEST_CONVERSATION_FILE } = sandbox;

      console.log("coversationNames", coversationNames);

      res.json({
        fileContent,
        sandbox,
        modifiedContent,
        snapshots: coversationNames || [],
        latestSnapshot: LATEST_CONVERSATION_FILE || "not found",
      });
    } catch (error) {
      console.error("Error executing script:", error);
      res.status(500).json({ error: "Failed to execute snapshots.js" });
    }
  });
});

module.exports = router;
