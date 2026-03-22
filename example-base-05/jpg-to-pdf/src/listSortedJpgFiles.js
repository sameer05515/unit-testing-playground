const fs = require('fs');

/**
 * Returns .jpg filenames in folderPath, sorted by numeric basename when possible.
 */
function listSortedJpgFiles(folderPath) {
  return fs
    .readdirSync(folderPath)
    .filter(file => file.toLowerCase().endsWith('.jpg'))
    .sort((a, b) => parseInt(a, 10) - parseInt(b, 10));
}

module.exports = { listSortedJpgFiles };
