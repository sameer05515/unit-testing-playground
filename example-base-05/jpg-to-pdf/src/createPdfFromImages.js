const fs = require('fs');
const path = require('path');
const { PDFDocument } = require('pdf-lib');
const { listSortedJpgFiles } = require('./listSortedJpgFiles');

/**
 * @param {object} options
 * @param {string} options.inputFolder
 * @param {string} options.outputFolder
 * @param {string} options.outputFileName
 * @returns {Promise<string|null>} Absolute path to written PDF, or null if no images.
 */
async function createPdfFromImages({ inputFolder, outputFolder, outputFileName }) {
  if (!fs.existsSync(outputFolder)) {
    fs.mkdirSync(outputFolder, { recursive: true });
  }

  const imageFiles = listSortedJpgFiles(inputFolder);
  if (imageFiles.length === 0) {
    console.error('No JPG files found in the input folder.');
    return null;
  }

  const pdfDoc = await PDFDocument.create();

  for (const fileName of imageFiles) {
    const filePath = path.join(inputFolder, fileName);
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
  return outputFilePath;
}

module.exports = { createPdfFromImages };
