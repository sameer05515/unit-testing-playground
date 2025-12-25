const fs = require("fs");
const path = require("path");
const AdmZip = require("adm-zip");
const PDFDocument = require("pdfkit");
const fse = require("fs-extra");

// Try to import node-unrar-js - it may export differently
let Unrar;
try {
  Unrar = require("node-unrar-js");
  // Check if it's a default export
  if (Unrar.default) {
    Unrar = Unrar.default;
  }
} catch (e) {
  console.error("Error loading node-unrar-js:", e.message);
  process.exit(1);
}

const INPUT_DIR = "D:\\Prem\\hawaldar bahadur";  // change path

async function main() {
  const files = fs.readdirSync(INPUT_DIR)
    .filter(f => f.toLowerCase().endsWith(".cbz") || f.toLowerCase().endsWith(".cbr"));

  for (const file of files) {
    const full = path.join(INPUT_DIR, file);
    const base = path.basename(file, path.extname(file));
    const outDir = path.join(INPUT_DIR, base);

    await fse.ensureDir(outDir);

    if (file.toLowerCase().endsWith(".cbz")) extractCBZ(full, outDir);
    else extractCBR(full, outDir);

    await createPDF(outDir, path.join(outDir, `${base}.pdf`));

    console.log("Done:", file);
  }

  console.log("\nAll Completed ✔️");
}

function extractCBZ(src, out) {
  const zip = new AdmZip(src);
  zip.extractAllTo(out, true);
}

function extractCBR(src, out) {
  try {
    const data = fs.readFileSync(src);
    
    // Use createExtractorFromData from Unrar
    // The extractor returns an array directly, first element contains state
    const list = Unrar.createExtractorFromData({ data });
    
    // Debug: check what list contains
    console.log('List type:', Array.isArray(list) ? 'array' : typeof list);
    console.log('List length:', Array.isArray(list) ? list.length : 'N/A');
    if (list && list[0]) {
      console.log('List[0] keys:', Object.keys(list[0]));
      if (list[0].state) {
        console.log('List[0].state keys:', Object.keys(list[0].state));
      }
    }
    
    // The list is an array, first element contains state with fileHeaders
    const fileHeaders = list[0]?.state?.fileHeaders || [];
    
    // Get the extractor from the list for extracting files
    const extractor = list[0]?.extractor || list;

    fileHeaders.forEach(f => {
      const name = f.name;
      if (!/\.(jpg|jpeg|png)$/i.test(name)) return;

      // Extract the file
      const extracted = extractor.extractFiles({ files: [name] });
      
      // The extracted data is in extracted[0].state.files[0].extract[0].fileData
      if (extracted && extracted[0] && extracted[0].state && extracted[0].state.files && extracted[0].state.files[0]) {
        const file = extracted[0].state.files[0];
        if (file.extract && file.extract[0] && file.extract[0].fileData) {
          const dest = path.join(out, path.basename(name));
          fs.writeFileSync(dest, Buffer.from(file.extract[0].fileData));
        }
      }
    });
  } catch (error) {
    console.error(`Error extracting CBR file ${src}:`, error.message);
    console.error(error.stack);
    throw error;
  }
}

async function createPDF(imagesDir, pdfPath) {
  const files = fs.readdirSync(imagesDir)
    .filter(f => /\.(jpg|jpeg|png)$/i.test(f))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

  if (!files.length) return;

  const doc = new PDFDocument({ autoFirstPage: false });
  const stream = fs.createWriteStream(pdfPath);
  doc.pipe(stream);

  for (const img of files) {
    const imgPath = path.join(imagesDir, img);
    const { width, height } = doc.openImage(imgPath);
    doc.addPage({ size: [width, height] });
    doc.image(imgPath, 0, 0, { width, height });
  }

  doc.end();
  return new Promise(res => stream.on("finish", res));
}

main().catch(console.error);
