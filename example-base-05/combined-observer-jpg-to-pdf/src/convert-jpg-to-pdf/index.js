const fs = require("fs");
const path = require("path");
const { PDFDocument } = require("pdf-lib");

const { outputFolderNames } = require("../common/utils");

/**
 * Ensures a directory exists; creates it if not.
 * @param {string} dirPath - The directory path to check or create.
 */
const ensureDirectoryExists = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

/**
 * Reads and sorts image files from a directory.
 * @param {string} folderPath - The folder containing image files.
 * @returns {string[]} Sorted list of image file names.
 */
const getImageFiles = (folderPath) => {
  return fs
    .readdirSync(folderPath)
    .filter((file) => file.endsWith(".jpg"))
    .sort((a, b) => parseInt(a, 10) - parseInt(b, 10));
};

/**
 * Converts image files in a folder to a single PDF file.
 * @param {string} inputFolder - The folder containing image files.
 * @param {string} outputFolder - The folder to save the generated PDF.
 * @param {string} outputFileName - The name of the output PDF file.
 */
const createPdfFromImages = async (inputFolder, outputFolder, outputFileName) => {
  try {
    ensureDirectoryExists(outputFolder);

    const imageFiles = getImageFiles(inputFolder);
    if (imageFiles.length === 0) {
      console.error(`No JPG files found in the folder: ${inputFolder}`);
      return;
    }

    const pdfDoc = await PDFDocument.create();
    for (const file of imageFiles) {
      const filePath = path.join(inputFolder, file);
      const imageBytes = fs.readFileSync(filePath);
      const image = await pdfDoc.embedJpg(imageBytes);

      const page = pdfDoc.addPage([image.width, image.height]);
      page.drawImage(image, {
        x: 0,
        y: 0,
        width: image.width,
        height: image.height,
      });
    }

    const pdfBytes = await pdfDoc.save();
    const outputFilePath = path.join(outputFolder, outputFileName);
    fs.writeFileSync(outputFilePath, pdfBytes);

    console.log(`PDF created successfully: ${outputFilePath}`);
  } catch (error) {
    console.error(`Error creating PDF from images in folder: ${inputFolder}`, error);
  }
};

/**
 * Processes multiple folder configurations to generate PDFs.
 * @param {Array} folderConfigs - Array of folder configuration objects.
 */
const processFoldersToPdf = (folderConfigs) => {
  folderConfigs.forEach(
    async ({ inputFolder, outputFolder, outputFileName }) =>
      await createPdfFromImages(inputFolder, outputFolder, outputFileName)
  );
};

// // Input folder configurations
// const outputFolderNames = [
// //   "maha-nahagan-part-2-rakt-parv",
// //   "maha-nahagan-part-1-avataran-parv",
// //   "kabad-nagar",
// //   "balcharit-1",
// //   "balcharit-2",
// //   "balcharit-3",
// //   "balcharit-4",
// //   "balcharit-5",
// //   "balcharit-6",
// //   "hawaldar-bahadur-mental-town",
// //   "aatank",
// //   "superman-scd",
// //   "vrishchika-hatyakand",
// //   "makabara-scd-nagraj",
// //   "crookbond-jaasoos-ka-hatyara",
// //   "hawaldar-bahadur-baccho-ke-chor",
// //   "scd-mumy-ka-kahar",
// //   "crookbond-sabhi-deewane-jooton-ke",
// //   "fighter-toads-karorepati",
// ].map((folderName) => ({
//   inputFolder: path.join("D:\\Prem\\comic-imges", folderName),
//   outputFolder: "D:\\Prem\\comics",
//   outputFileName: `${folderName}.pdf`,
// }));

// Run the script
processFoldersToPdf(outputFolderNames);
