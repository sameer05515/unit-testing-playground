import * as pdfjsLib from "../node_modules/pdfjs-dist/build/pdf.mjs";

pdfjsLib.GlobalWorkerOptions.workerSrc =
  new URL("../node_modules/pdfjs-dist/build/pdf.worker.mjs", import.meta.url).toString();

const openBtn = document.getElementById("openBtn");
const emptyOpenBtn = document.getElementById("emptyOpenBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const pageNumber = document.getElementById("pageNumber");
const pageCount = document.getElementById("pageCount");
const zoomOutBtn = document.getElementById("zoomOutBtn");
const zoomInBtn = document.getElementById("zoomInBtn");
const fitBtn = document.getElementById("fitBtn");
const zoomValue = document.getElementById("zoomValue");
const fileName = document.getElementById("fileName");
const status = document.getElementById("status");
const emptyState = document.getElementById("emptyState");
const canvas = document.getElementById("pdfCanvas");
const viewerContainer = document.getElementById("viewerContainer");

const ctx = canvas.getContext("2d");

let pdfDocument = null;
let currentPage = 1;
let scale = 1.0;

async function openPdf() {
  const pdfFile = await window.electronAPI.openPdf();

  if (!pdfFile) {
    return;
  }

  try {
    status.textContent = "Loading PDF...";

    // The PDF is read by Electron's main process and transferred to the
    // renderer. This avoids file:// fetch/CORS issues on Windows.
    pdfDocument = await pdfjsLib.getDocument({
      data: new Uint8Array(pdfFile.data)
    }).promise;

    currentPage = 1;
    scale = 1.0;

    fileName.textContent = pdfFile.fileName;

    pageCount.textContent = `/ ${pdfDocument.numPages}`;
    pageNumber.max = pdfDocument.numPages;

    emptyState.hidden = true;
    canvas.hidden = false;

    await renderPage();

    status.textContent = "PDF loaded";
  } catch (error) {
    console.error(error);
    status.textContent = "Failed to load PDF";
    alert(`Unable to open PDF:\n${error.message}`);
  }
}

async function renderPage() {
  if (!pdfDocument) {
    return;
  }

  const page = await pdfDocument.getPage(currentPage);
  const viewport = page.getViewport({ scale });

  canvas.width = viewport.width;
  canvas.height = viewport.height;

  await page.render({
    canvasContext: ctx,
    viewport
  }).promise;

  pageNumber.value = currentPage;
  zoomValue.textContent = `${Math.round(scale * 100)}%`;

  prevBtn.disabled = currentPage <= 1;
  nextBtn.disabled = currentPage >= pdfDocument.numPages;

  status.textContent = `Page ${currentPage} of ${pdfDocument.numPages}`;
}

async function goToPage(page) {
  if (!pdfDocument) {
    return;
  }

  const requestedPage = Number(page);

  if (
    !Number.isInteger(requestedPage) ||
    requestedPage < 1 ||
    requestedPage > pdfDocument.numPages
  ) {
    pageNumber.value = currentPage;
    return;
  }

  currentPage = requestedPage;
  await renderPage();
}

async function changeZoom(delta) {
  if (!pdfDocument) {
    return;
  }

  scale = Math.min(4.0, Math.max(0.25, scale + delta));
  await renderPage();
}

async function fitWidth() {
  if (!pdfDocument) {
    return;
  }

  const page = await pdfDocument.getPage(currentPage);

  const unscaledViewport = page.getViewport({ scale: 1 });
  const availableWidth = viewerContainer.clientWidth - 56;

  scale = availableWidth / unscaledViewport.width;
  scale = Math.min(4.0, Math.max(0.25, scale));

  await renderPage();
}

openBtn.addEventListener("click", openPdf);
emptyOpenBtn.addEventListener("click", openPdf);

prevBtn.addEventListener("click", () => {
  goToPage(currentPage - 1);
});

nextBtn.addEventListener("click", () => {
  goToPage(currentPage + 1);
});

pageNumber.addEventListener("change", () => {
  goToPage(pageNumber.value);
});

zoomOutBtn.addEventListener("click", () => {
  changeZoom(-0.1);
});

zoomInBtn.addEventListener("click", () => {
  changeZoom(0.1);
});

fitBtn.addEventListener("click", fitWidth);

document.addEventListener("keydown", (event) => {
  if (!pdfDocument) {
    return;
  }

  if (event.key === "ArrowLeft") {
    goToPage(currentPage - 1);
  }

  if (event.key === "ArrowRight") {
    goToPage(currentPage + 1);
  }

  if (event.key === "+" || event.key === "=") {
    changeZoom(0.1);
  }

  if (event.key === "-") {
    changeZoom(-0.1);
  }

  if (event.key === "Home") {
    goToPage(1);
  }

  if (event.key === "End") {
    goToPage(pdfDocument.numPages);
  }

  if (event.ctrlKey && event.key.toLowerCase() === "o") {
    event.preventDefault();
    openPdf();
  }
});
