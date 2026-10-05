const fs = require("fs");
const path = require("path");

const DIRECTORY_PATH =
  "D:\\GIT\\microservices-playground\\example-base-03\\fontend\\chat-gpt-conversation\\public\\ques-and-ans";

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
      } else if (file.toLowerCase().endsWith(".md")) {
        // Create slug from relative path
        // const slug = generateSlug(filePath);
        const slug = file;
        results.push({ slug, filePath });
      }
    });
  }

  readDir(dir);
  return results;
}

const questions = getPdfFiles(DIRECTORY_PATH);

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
  const index = questions.findIndex((file) => file.slug === slug);

  if (index === -1) {
    return null; // Slug not found
  }

  const prevIndex = (index - 1 + questions.length) % questions.length; // Circular prev
  const nextIndex = (index + 1) % questions.length; // Circular next

  return {
    fileAbsolutePath: questions[index].filePath,
    prevSlug: questions[prevIndex].slug,
    nextSlug: questions[nextIndex].slug,
    currentIndex: index,
    prevIndex: prevIndex,
    nextIndex: nextIndex,
  };
}

module.exports = { questions, getDetailsForSlug };
