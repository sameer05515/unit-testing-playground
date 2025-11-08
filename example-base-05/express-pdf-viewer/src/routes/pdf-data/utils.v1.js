const fs = require("fs");
const path = require("path");
const { PDF_DIRECTORY_PATH } = require("../../common/constants");

const DIRECTORY_PATH = PDF_DIRECTORY_PATH || "D:\\prem\\comics"; // Change this path if needed

/**
 * Converts a file path to a slug:
 * - Relative to DIRECTORY_PATH
 * - Lowercase, space -> "-", kebab-case
 * @param {string} filePath - Absolute file path
 * @returns {string} - Slugified relative path
 */
function generateSlug(filePath) {
  let relativePath = path.relative(DIRECTORY_PATH, filePath);
  return relativePath
    .replace(/\\/g, "--") // Convert Windows backslashes to forward slashes
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with "-"
    .replace(/[^a-z0-9\-\/]/g, ""); // Remove special characters
}

/**
 * Recursively scans a directory and returns an array of PDF file objects
 * @param {string} dir - Directory to scan
 * @returns {Array<{slug: string, filePath: string}>}
 */
function getPdfFiles(dir) {
  let results = [];

  function readDir(directory) {
    const files = fs.readdirSync(directory);

    files.forEach((file) => {
      const filePath = path.join(directory, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        // Recursively scan subdirectories
        readDir(filePath);
      } else if (file.toLowerCase().endsWith(".pdf")) {
        // Create slug from relative path
        const slug = generateSlug(filePath);
        results.push({ slug, filePath });
      }
    });
  }

  readDir(dir);
  return results;
}

// Get all PDF files
const files = getPdfFiles(DIRECTORY_PATH);

/**
 * Gets details for a given slug, including navigation indices
 * @param {string} slug - The slug of the file
 * @returns {{
 *   fileAbsolutePath: string,
 *   prevSlug: string,
 *   nextSlug: string,
 *   currentIndex: number,
 *   prevIndex: number,
 *   nextIndex: number
 * }} - File details and navigation indices
 */
function getDetailsForSlug(slug) {
  const index = files.findIndex((file) => file.slug === slug);

  if (index === -1) {
    return null; // Slug not found
  }

  const prevIndex = (index - 1 + files.length) % files.length; // Circular prev
  const nextIndex = (index + 1) % files.length; // Circular next

  return {
    fileAbsolutePath: files[index].filePath,
    prevSlug: files[prevIndex].slug,
    nextSlug: files[nextIndex].slug,
    currentIndex: index,
    prevIndex: prevIndex,
    nextIndex: nextIndex,
  };
}

module.exports = { files, getDetailsForSlug };
