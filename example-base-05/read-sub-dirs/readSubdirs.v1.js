// readSubdirs.js
const fs = require('fs');
const path = require('path');

// const folderPath = process.argv[2] || '.'; // Default to current directory
const folderPath="D:/";

const Content=require("./Content");
let root=null;

fs.readdir(folderPath, { withFileTypes: true }, (err, items) => {
  if (err) {
    console.error('Error reading directory:', err);
    return;
  }

  const subdirs = items
    .filter(item => item.isDirectory())
    .map(dir => path.join(folderPath, dir.name));

  console.log('Subdirectories:');
  subdirs.forEach(dir => console.log(dir));
});
