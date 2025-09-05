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
const subDirs = [
  "05-july-2016",
  "21-dec-2015-home-pc",
  "21-dec-2015-office",
  "21-jul-19-oppo",
  "aerobics-natya",
  "APPLN_SERVERS-office",
  "Backup before ubuntu",
  // "bkp30jun18",
  "CUSTOM INSTALLATIONS-office",
  "deskop-bkp-30jun18",
  "ebooks-home-pc",
  "home-pc",
  "java 9",
  "KT-Documents",
  "movies",
  "mum 507",
  "Narendra",
  "Negotiations",
  "new downloads",
  "Novelvox",
  "old movies 08-Apr-18",
  "oppo-06-aug-17",
  "oppo-10jan19",
  "Oppo-Backup-15oct2018",
  "oppo-home-pc",
  "oppo-mobile-data-05-Jan-18",
  "readings-office",
  "rimjhim",
  "Sandeep Singh",
  // "segate-files",
  "SELF",
  "songs",
  "Sup",
  "TUTORIAL",
  "tutorials",
  "VANDANA",
  "you tube videos",
];
const folderPath = "E:";
const result = [];
subDirs.forEach((sub) => {
  result.push(...(readSubdirsRecursive(`${folderPath}/${sub}`) || []));
});
// const result = readSubdirsRecursive(folderPath) || [];
// console.log(JSON.stringify(result, null, 1));
console.log(result.length);
FileRelatedOperations.writeFileContentSync(`D:\\v-dir\\content.json`, JSON.stringify(result));
