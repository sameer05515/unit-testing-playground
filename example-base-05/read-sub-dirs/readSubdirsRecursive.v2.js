// readSubdirsRecursive.js
const fs = require("fs");
const path = require("path");
const FileRelatedOperations = require("./FileRelatedOperations.services.v2");
const Content = require("./Content");

function readSubdirsRecursive(dirPath, parentId = "") {
  let contents = [];

  const items = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const item of items) {
    const fullPath = path.join(dirPath, item.name);
    if (item.isDirectory()) {
      const content = Content.fromData({
        path: fullPath,
        type: "folder",
        parentId,
      });
      contents.push(content);

      // Recursively read subdirectories
      contents = contents.concat(readSubdirsRecursive(fullPath, fullPath));
    }

    if (item.isFile()) {
      const content = Content.fromData({
        path: fullPath,
        type: "file",
        parentId,
      });
      contents.push(content);
    }
  }

  return contents;
}

// Usage
// const targetDir = process.argv[2] || '.';
const folderPath = "D:/Prem";
const result = readSubdirsRecursive(folderPath)||[];
// console.log(JSON.stringify(result, null, 1));
console.log(result.length)
FileRelatedOperations.writeFileContentSync(`D:\\v-dir\\content.json`, JSON.stringify(result));
