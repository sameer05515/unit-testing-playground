const fs = require('fs');
const path = require('path');

// Configuration
const DRIVE_PATH = 'E:\\';
const OUTPUT_FILE = path.join(__dirname, '..', 'mp4-files.json');
const FILE_EXTENSION = '.mp4';

/**
 * Recursively scan directory for MP4 files
 * @param {string} dirPath - Directory path to scan
 * @param {Array} fileList - Array to store found files
 * @returns {Promise<Array>} - Array of file information objects
 */
async function scanDirectory(dirPath, fileList = []) {
  try {
    const entries = await fs.promises.readdir(dirPath, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dirPath, entry.name);

      try {
        if (entry.isDirectory()) {
          // Recursively scan subdirectories
          await scanDirectory(fullPath, fileList);
        } else if (entry.isFile() && path.extname(entry.name).toLowerCase() === FILE_EXTENSION) {
          // Get file stats
          const stats = await fs.promises.stat(fullPath);
          
          const fileInfo = {
            path: fullPath,
            name: entry.name,
            size: stats.size,
            sizeFormatted: formatBytes(stats.size),
            created: stats.birthtime.toISOString(),
            modified: stats.mtime.toISOString(),
            accessed: stats.atime.toISOString()
          };

          fileList.push(fileInfo);
          console.log(`Found: ${fullPath} (${fileInfo.sizeFormatted})`);
        }
      } catch (error) {
        // Skip files/directories that can't be accessed (permissions, etc.)
        console.warn(`Skipping ${fullPath}: ${error.message}`);
      }
    }
  } catch (error) {
    console.error(`Error scanning directory ${dirPath}: ${error.message}`);
  }

  return fileList;
}

/**
 * Format bytes to human-readable format
 * @param {number} bytes - File size in bytes
 * @returns {string} - Formatted size string
 */
function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

/**
 * Main function to scan E: drive and save results
 */
async function main() {
  console.log(`Starting scan of ${DRIVE_PATH} for ${FILE_EXTENSION} files...`);
  console.log(`Output will be saved to: ${OUTPUT_FILE}`);
  console.log('This may take a while depending on the number of files...\n');

  const startTime = Date.now();
  const mp4Files = await scanDirectory(DRIVE_PATH);
  const endTime = Date.now();
  const duration = ((endTime - startTime) / 1000).toFixed(2);

  // Calculate total size
  const totalSize = mp4Files.reduce((sum, file) => sum + file.size, 0);

  // Create result object
  const result = {
    scanDate: new Date().toISOString(),
    drivePath: DRIVE_PATH,
    totalFiles: mp4Files.length,
    totalSize: totalSize,
    totalSizeFormatted: formatBytes(totalSize),
    scanDuration: `${duration} seconds`,
    files: mp4Files.sort((a, b) => a.path.localeCompare(b.path))
  };

  // Write to JSON file
  try {
    await fs.promises.writeFile(
      OUTPUT_FILE,
      JSON.stringify(result, null, 2),
      'utf8'
    );
    
    console.log('\n=== Scan Complete ===');
    console.log(`Total MP4 files found: ${result.totalFiles}`);
    console.log(`Total size: ${result.totalSizeFormatted}`);
    console.log(`Scan duration: ${result.scanDuration}`);
    console.log(`Results saved to: ${OUTPUT_FILE}`);
  } catch (error) {
    console.error(`Error writing to ${OUTPUT_FILE}:`, error.message);
    process.exit(1);
  }
}

// Run the scanner
main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});

