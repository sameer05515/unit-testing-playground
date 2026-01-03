const path = require('path');

module.exports = {
  port: process.env.PORT || 3030,
  markdownRoots: [
    // Update these paths to point at the folders that contain your Markdown files.
    path.resolve(__dirname, 'sample-markdown'),
    "D:\\GIT\\my-backup\\knowledge-base"
  ]
};

