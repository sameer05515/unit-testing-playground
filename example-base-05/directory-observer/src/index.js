const chokidar = require("../node_modules/chokidar");
const fs = require("fs");
const path = require("path");

// Directories
// const watchDir = path.join(__dirname, '../watch'); // Directory to observe
// const outputDir = path.join(__dirname, '../output'); // Directory to copy and rename files

const watchDir = "C:\\Users\\preme\\OneDrive\\Desktop\\DUMP\\watch-directory"; // Directory to observe
const outputDir = "D:\\Prem\\comic-imges\\fighter-toads-karorepati"; // Directory to copy and rename files

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
}

// Function to get the new file name
const getNewFileName = (dir, ext) => {
    const totalFiles = fs.readdirSync(dir).length;
    return `${totalFiles + 1}${ext}`;
};

// Function to handle new files
const handleNewFile = (filePath) => {
    const fileName = path.basename(filePath);
    const ext = path.extname(fileName);
    console.log(`Extention: ${ext},  filePath: ${filePath}`);
    if (".jpg" !== ext) {
        console.log(
            "No action required for extention: " + ext,
            " Ignoring file: " + fileName
        );
        return;
    }
    const newFileName = getNewFileName(outputDir, ext);
    const destPath = path.join(outputDir, newFileName);

    fs.copyFile(filePath, destPath, (err) => {
        if (err) {
            console.error(`Error copying file ${fileName}:`, err);
        } else {
            console.log(`File ${fileName} copied and renamed to ${destPath}`);

            // Delete the file from the watch directory after copying
            fs.unlink(filePath, (deleteErr) => {
                if (deleteErr) {
                    console.error(`Error deleting file ${fileName}:`, deleteErr);
                } else {
                    console.log(`File ${fileName} deleted from watch directory.`);
                }
            });
        }
    });
};

// Watcher setup
const watcher = chokidar.watch(watchDir, {
    persistent: true,
    ignoreInitial: true, // Ignore already existing files on start
});

// Watcher event handlers
watcher
    .on("add", (filePath) => {
        console.log(`New file detected: ${filePath}`);
        handleNewFile(filePath);
    })
    .on("error", (error) => console.error(`Watcher error: ${error}`));

console.log(`Watching directory: ${watchDir}, \n outputDir: ${outputDir}`);
