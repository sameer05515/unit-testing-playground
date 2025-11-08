const chokidar = require("chokidar");
const fs = require("fs");
const path = require("path");

const { WATCH_DIRECTORY, OUTPUT_DIRECTORY } = require("../common/utils");

// Directories
// const WATCH_DIRECTORY = "C:\\Users\\preme\\OneDrive\\Desktop\\DUMP\\watch-directory";
// const OUTPUT_DIRECTORY = "D:\\Prem\\comic-images\\fighter-toads-karorepati";

// Ensure the output directory exists
const ensureDirectoryExists = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};
ensureDirectoryExists(OUTPUT_DIRECTORY);

// Generate a new file name based on existing files in the output directory
const generateNewFileName = (directory, extension) => {
  const fileCount = fs.readdirSync(directory).length;
  return `${fileCount + 1}${extension}`;
};

// Copy and rename a file, then delete the original
const copyAndRenameFile = (sourcePath, destinationDirectory) => {
  const fileName = path.basename(sourcePath);
  const fileExtension = path.extname(fileName).toLowerCase();

  console.log(`Processing file: ${fileName}, Extension: ${fileExtension}`);

  // Ignore non-.jpg files
  if (fileExtension !== ".jpg") {
    console.log(`Skipping file: ${fileName}. Unsupported extension.`);
    return;
  }

  const newFileName = generateNewFileName(destinationDirectory, fileExtension);
  const destinationPath = path.join(destinationDirectory, newFileName);

  fs.copyFile(sourcePath, destinationPath, (copyError) => {
    if (copyError) {
      console.error(`Error copying file ${fileName}:`, copyError);
      return;
    }

    console.log(`File ${fileName} renamed to ${newFileName} and copied to ${destinationPath}`);

    // Delete the original file
    fs.unlink(sourcePath, (deleteError) => {
      if (deleteError) {
        console.error(`Error deleting file ${fileName}:`, deleteError);
      } else {
        console.log(`File ${fileName} deleted from watch directory.`);
      }
    });
  });
};

// Set up file watcher
const setupWatcher = (watchDir, outputDir) => {
  const watcher = chokidar.watch(watchDir, {
    persistent: true,
    ignoreInitial: true,
  });

  watcher
    .on("add", (filePath) => {
      console.log(`New file detected: ${filePath}`);
      copyAndRenameFile(filePath, outputDir);
    })
    .on("error", (error) => {
      console.error(`Watcher error: ${error}`);
    });

  console.log(`Watching directory: ${watchDir}`);
  console.log(`Output directory: ${outputDir}`);
};

// Start watching
setupWatcher(WATCH_DIRECTORY, OUTPUT_DIRECTORY);
