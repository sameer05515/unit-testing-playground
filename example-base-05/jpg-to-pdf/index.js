const fs = require("fs");
const path = require("path");
const { PDFDocument, rgb } = require("pdf-lib");

// Folder paths
// const inputFolder = path.join(__dirname, 'input');
// const outputFolder = path.join(__dirname, 'output');
// const inputFolder= "C:\\Users\\preme\\OneDrive\\Desktop\\DUMP\\24-nov";
// const inputFolder= "C:\\Users\\preme\\OneDrive\\Desktop\\DUMP\\skd-nano";

// Function to read image files from folder
const getImageFiles = (folderPath) => {
    return fs
        .readdirSync(folderPath)
        .filter((file) => file.endsWith(".jpg"))
        .sort((a, b) => parseInt(a) - parseInt(b)); // Sort files by number
};

// Convert JPG to PDF
const createPdfFromImages = async (
    inputFolder,
    outputFolder,
    outputFileName
) => {
    // Ensure output folder exists
    if (!fs.existsSync(outputFolder)) {
        fs.mkdirSync(outputFolder);
    }

    const imageFiles = getImageFiles(inputFolder);
    if (imageFiles.length === 0) {
        console.error("No JPG files found in the input folder.");
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

// const inputFolder =
//     "C:\\Users\\preme\\OneDrive\\Desktop\\DUMP\\hawaldar-bahadur-ganja-king-kong";
// const outputFolder = "C:\\Users\\preme\\OneDrive\\Desktop\\DUMP\\25-nov";
// const outputFileName = "hawaldar-bahadur-ganja-king-kong.pdf";

// createPdfFromImages(inputFolder, outputFolder, outputFileName).catch(err => {
//     console.error('Error creating PDF:', err);
// });

const inputArr = [
    // {
    //     inputFolder:
    //         "C:\\Users\\preme\\OneDrive\\Desktop\\DUMP\\hawaldar-bahadur-ganja-king-kong",
    //     outputFolder: "C:\\Users\\preme\\OneDrive\\Desktop\\DUMP\\25-nov",
    //     outputFileName: "hawaldar-bahadur-ganja-king-kong.pdf",
    // },
    // {
    //     inputFolder:
    //         "C:\\Users\\preme\\OneDrive\\Desktop\\DUMP\\nagraj-kaal-karaal",
    //     outputFolder: "C:\\Users\\preme\\OneDrive\\Desktop\\DUMP\\25-nov",
    //     outputFileName: "nagraj-kaal-karaal.pdf",
    // },
    // {
    //     inputFolder:
    //         "C:\\Users\\preme\\OneDrive\\Desktop\\DUMP\\nagayan-upsanhar",
    //     outputFolder: "C:\\Users\\preme\\OneDrive\\Desktop\\DUMP\\25-nov",
    //     outputFileName: "nagayan-upsanhar.pdf",
    // },
    // {
    //     inputFolder:
    //         "C:\\Users\\preme\\OneDrive\\Desktop\\DUMP\\negatives",
    //     outputFolder: "C:\\Users\\preme\\OneDrive\\Desktop\\DUMP\\25-nov",
    //     outputFileName: "negatives.pdf",
    // },
    // {
    //     inputFolder:
    //         "C:\\Users\\preme\\OneDrive\\Desktop\\DUMP\\maha-nahagan-part-3-sandhi-parv",
    //     outputFolder: "C:\\Users\\preme\\OneDrive\\Desktop\\DUMP\\25-nov",
    //     outputFileName: "maha-nahagan-part-3-sandhi-parv.pdf",
    // },
];

const outputFolderNames=[
    // "maha-nahagan-part-2-rakt-parv",
    // "maha-nahagan-part-1-avataran-parv",
    // "kabad-nagar",
    // "balcharit-1",
    // "balcharit-2",
    // "balcharit-3",
    // "balcharit-4",
    // "balcharit-5",
    // "balcharit-6",
    // "hawaldar-bahadur-mental-town",
    // "aatank",
    // "superman-scd",
    // "vrishchika-hatyakand",
    // "makabara-scd-nagraj",
    // "crookbond-jaasoos-ka-hatyara",
    // "hawaldar-bahadur-baccho-ke-chor",
    // "scd-mumy-ka-kahar",
    // "crookbond-sabhi-deewane-jooton-ke",
    // "fighter-toads-karorepati",
]
.map(outFoldName=>({
    inputFolder:
        "D:\\Prem\\comic-imges\\"+outFoldName,
    outputFolder: "D:\\Prem\\comics",
    outputFileName: `${outFoldName}.pdf`,
}))
// .map(outFoldName=>({
//         inputFolder:
//             "C:\\Users\\preme\\OneDrive\\Desktop\\DUMP\\"+outFoldName,
//         outputFolder: "C:\\Users\\preme\\OneDrive\\Desktop\\DUMP\\25-nov",
//         outputFileName: `${outFoldName}.pdf`,
// }))

outputFolderNames.forEach(({ inputFolder, outputFolder, outputFileName }) =>
    createPdfFromImages(inputFolder, outputFolder, outputFileName).catch(
        (err) => {
            console.error("Error creating PDF:", err);
        }
    )
);
