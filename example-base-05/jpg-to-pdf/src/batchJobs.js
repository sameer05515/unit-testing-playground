const path = require('path');

/*
 * Edit COMIC_IMAGES_ROOT / PDF_OUTPUT_ROOT and FOLDER_NAMES below.
 * Each name N produces: input = join(COMIC_IMAGES_ROOT, N), output PDF = join(PDF_OUTPUT_ROOT, `${N}.pdf`).
 */

/** Root folder that contains one subfolder per comic (each subfolder holds JPG page images). */
const COMIC_IMAGES_ROOT = 'D:\\Prem\\comic-imges';

/** Directory where generated PDFs are written. */
const PDF_OUTPUT_ROOT = 'D:\\Prem\\comics';

/**
 * Subfolder names under COMIC_IMAGES_ROOT to turn into PDFs.
 * Add or uncomment names to process those folders.
 */
const FOLDER_NAMES = [
  // 'maha-nahagan-part-2-rakt-parv',
  // 'maha-nahagan-part-1-avataran-parv',
  // 'kabad-nagar',
];

/**
 * @param {string[]} folderNames
 * @returns {{ inputFolder: string, outputFolder: string, outputFileName: string }[]}
 */
function buildPdfJobs(folderNames = FOLDER_NAMES) {
  return folderNames.map(name => ({
    inputFolder: path.join(COMIC_IMAGES_ROOT, name),
    outputFolder: PDF_OUTPUT_ROOT,
    outputFileName: `${name}.pdf`,
  }));
}

module.exports = {
  COMIC_IMAGES_ROOT,
  PDF_OUTPUT_ROOT,
  FOLDER_NAMES,
  buildPdfJobs,
};
