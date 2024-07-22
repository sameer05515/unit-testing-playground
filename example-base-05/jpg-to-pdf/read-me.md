# please create a nodejs project to create pdf from jpg files of given folder. (files are named as 1.jpg, 2.jpg..)

Here’s a Node.js project that converts JPG files in a specified folder into a single PDF. It uses the **`pdf-lib`** library for PDF creation and **`fs`** module for file operations.

### Steps to Create the Project

1. **Initialize the project**:
   ```bash
   mkdir jpg-to-pdf
   cd jpg-to-pdf
   npm init -y
   npm install pdf-lib fs path
   ```

2. **Create the project structure**:
   ```
   jpg-to-pdf/
   ├── input/        # Folder where you place JPG files (1.jpg, 2.jpg, etc.)
   ├── output/       # Folder where the output PDF will be saved
   ├── index.js      # Main script
   └── package.json
   ```

3. **Code for `index.js`**:

   ```javascript
   const fs = require('fs');
   const path = require('path');
   const { PDFDocument, rgb } = require('pdf-lib');

   // Folder paths
   const inputFolder = path.join(__dirname, 'input');
   const outputFolder = path.join(__dirname, 'output');
   const outputFileName = 'output.pdf';

   // Ensure output folder exists
   if (!fs.existsSync(outputFolder)) {
       fs.mkdirSync(outputFolder);
   }

   // Function to read image files from folder
   const getImageFiles = (folderPath) => {
       return fs.readdirSync(folderPath)
           .filter(file => file.endsWith('.jpg'))
           .sort((a, b) => parseInt(a) - parseInt(b)); // Sort files by number
   };

   // Convert JPG to PDF
   const createPdfFromImages = async (inputFolder, outputFolder, outputFileName) => {
       const imageFiles = getImageFiles(inputFolder);
       if (imageFiles.length === 0) {
           console.error('No JPG files found in the input folder.');
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
   };

   // Run the script
   createPdfFromImages(inputFolder, outputFolder, outputFileName).catch(err => {
       console.error('Error creating PDF:', err);
   });
   ```

4. **Usage**:
   - Place your JPG files (`1.jpg`, `2.jpg`, etc.) in the `input/` folder.
   - Run the script:
     ```bash
     node index.js
     ```
   - The output PDF (`output.pdf`) will be generated in the `output/` folder.

This project processes images in numerical order (e.g., `1.jpg`, `2.jpg`) and creates a single PDF file.