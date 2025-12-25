const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// Configuration
const DRIVE_PATH = process.env.DRIVE_PATH || 'E:\\';
const OUTPUT_FILE = path.join(__dirname, '..', 'media-files.json');
const ALLOWED_EXTENSIONS = ['.mp3', '.mp4', '.pdf', '.jpg', '.jpeg', '.flv'];
const EXCLUDE_DIRS = process.env.EXCLUDE_DIRS ? process.env.EXCLUDE_DIRS.split(',').map(d => d.trim()) : [];

// Extension type mapping
const EXTENSION_TYPES = {
  '.mp3': 'song',
  '.mp4': 'video',
  '.flv': 'video',
  '.pdf': 'pdf',
  '.jpg': 'image',
  '.jpeg': 'image'
};

/**
 * Generate a unique slug from file path
 * @param {string} filePath - Full file path
 * @returns {string} - Unique slug
 */
function generateSlug(filePath) {
  // Create a hash from the file path for uniqueness
  const hash = crypto.createHash('md5').update(filePath).digest('hex').substring(0, 8);
  // Create a readable slug from the filename
  const fileName = path.basename(filePath, path.extname(filePath));
  const readableSlug = fileName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .substring(0, 50); // Limit length
  
  return `${readableSlug}-${hash}`;
}

/**
 * Get extension type category
 * @param {string} extension - File extension (with or without dot)
 * @returns {string} - Extension type (image, pdf, song, video)
 */
function getExtensionType(extension) {
  const ext = extension.toLowerCase().startsWith('.') ? extension.toLowerCase() : `.${extension.toLowerCase()}`;
  return EXTENSION_TYPES[ext] || 'unknown';
}

/**
 * Check if a directory should be excluded
 * @param {string} dirPath - Directory path to check
 * @param {Array} excludeDirs - Array of directory paths/names to exclude
 * @returns {boolean} - True if directory should be excluded
 */
function shouldExcludeDirectory(dirPath, excludeDirs) {
  if (!excludeDirs || excludeDirs.length === 0) return false;
  
  const normalizedPath = dirPath.toLowerCase().replace(/\\/g, '/');
  
  for (const excludeDir of excludeDirs) {
    const normalizedExclude = excludeDir.toLowerCase().replace(/\\/g, '/');
    
    // Check if directory name matches
    const dirName = path.basename(dirPath).toLowerCase();
    if (dirName === normalizedExclude || dirName === path.basename(normalizedExclude).toLowerCase()) {
      return true;
    }
    
    // Check if full path matches or is a subdirectory
    if (normalizedPath === normalizedExclude || normalizedPath.startsWith(normalizedExclude + '/')) {
      return true;
    }
    
    // Check if it's a relative match (e.g., "node_modules" anywhere in path)
    if (normalizedPath.includes('/' + normalizedExclude + '/') || normalizedPath.endsWith('/' + normalizedExclude)) {
      return true;
    }
  }
  
  return false;
}

/**
 * Recursively scan directory for media files
 * @param {string} dirPath - Directory path to scan
 * @param {Array} fileList - Array to store found files
 * @param {Array} excludeDirs - Array of directories to exclude
 * @returns {Promise<Array>} - Array of file information objects
 */
async function scanDirectory(dirPath, fileList = [], excludeDirs = []) {
  // Check if this directory should be excluded
  if (shouldExcludeDirectory(dirPath, excludeDirs)) {
    console.log(`Excluding directory: ${dirPath}`);
    return fileList;
  }

  try {
    const entries = await fs.promises.readdir(dirPath, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dirPath, entry.name);

      try {
        if (entry.isDirectory()) {
          // Recursively scan subdirectories
          await scanDirectory(fullPath, fileList, excludeDirs);
        } else if (entry.isFile()) {
          const fileExtension = path.extname(entry.name).toLowerCase();
          
          // Check if file extension is in allowed list
          if (ALLOWED_EXTENSIONS.includes(fileExtension)) {
            // Get file stats
            const stats = await fs.promises.stat(fullPath);
            
            const fileInfo = {
              slug: generateSlug(fullPath),
              path: fullPath,
              name: entry.name,
              extension: fileExtension,
              extensionType: getExtensionType(fileExtension),
              size: stats.size,
              sizeFormatted: formatBytes(stats.size),
              created: stats.birthtime.toISOString(),
              modified: stats.mtime.toISOString(),
              accessed: stats.atime.toISOString()
            };

            fileList.push(fileInfo);
            console.log(`Found [${fileInfo.extensionType}]: ${fullPath} (${fileInfo.sizeFormatted})`);
          }
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
  console.log(`Starting scan of ${DRIVE_PATH} for files with extensions: ${ALLOWED_EXTENSIONS.join(', ')}`);
  console.log(`Output will be saved to: ${OUTPUT_FILE}`);
  if (EXCLUDE_DIRS.length > 0) {
    console.log(`Excluding directories: ${EXCLUDE_DIRS.join(', ')}`);
  }
  console.log('This may take a while depending on the number of files...\n');

  const startTime = Date.now();
  const mediaFiles = await scanDirectory(DRIVE_PATH, [], EXCLUDE_DIRS);
  const endTime = Date.now();
  const duration = ((endTime - startTime) / 1000).toFixed(2);

  // Calculate total size
  const totalSize = mediaFiles.reduce((sum, file) => sum + file.size, 0);

  // Count files by extension type
  const filesByType = mediaFiles.reduce((acc, file) => {
    acc[file.extensionType] = (acc[file.extensionType] || 0) + 1;
    return acc;
  }, {});

  // Count files by extension
  const filesByExtension = mediaFiles.reduce((acc, file) => {
    acc[file.extension] = (acc[file.extension] || 0) + 1;
    return acc;
  }, {});

  // Create result object
  const result = {
    scanDate: new Date().toISOString(),
    drivePath: DRIVE_PATH,
    totalFiles: mediaFiles.length,
    totalSize: totalSize,
    totalSizeFormatted: formatBytes(totalSize),
    scanDuration: `${duration} seconds`,
    filesByType: filesByType,
    filesByExtension: filesByExtension,
    files: mediaFiles.sort((a, b) => a.path.localeCompare(b.path))
  };

  // Write to JSON file
  try {
    await fs.promises.writeFile(
      OUTPUT_FILE,
      JSON.stringify(result, null, 2),
      'utf8'
    );
    
    console.log('\n=== Scan Complete ===');
    console.log(`Total files found: ${result.totalFiles}`);
    console.log(`Total size: ${result.totalSizeFormatted}`);
    console.log(`Scan duration: ${result.scanDuration}`);
    console.log('\nFiles by type:');
    Object.entries(filesByType).forEach(([type, count]) => {
      console.log(`  ${type}: ${count}`);
    });
    console.log('\nFiles by extension:');
    Object.entries(filesByExtension).forEach(([ext, count]) => {
      console.log(`  ${ext}: ${count}`);
    });
    console.log(`\nResults saved to: ${OUTPUT_FILE}`);
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

