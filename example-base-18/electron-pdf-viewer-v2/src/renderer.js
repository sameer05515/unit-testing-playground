import * as pdfjsLib from "../node_modules/pdfjs-dist/build/pdf.mjs";

pdfjsLib.GlobalWorkerOptions.workerSrc = "../node_modules/pdfjs-dist/build/pdf.worker.mjs";

const $ = id => document.getElementById(id);
const canvas = $("pdfCanvas");
const ctx = canvas.getContext("2d");

let pdfDocument = null;
let currentPage = 1;
let scale = 1;
let searchResults = [];
let currentMatch = -1;
let searchTimer = null;

const RECENT_KEY = "electron-pdf-viewer-v2-recent";
const THEME_KEY = "electron-pdf-viewer-v2-theme";

function status(s) { $("status").textContent = s; }

async function openPdf() {
  const result = await window.electronAPI.openPdf();
  if (!result) return;

  try {
    status("Loading PDF...");
    pdfDocument = await pdfjsLib.getDocument({ data: new Uint8Array(result.data) }).promise;

    currentPage = 1;
    scale = 1;
    searchResults = [];
    currentMatch = -1;

    $("fileName").textContent = result.fileName;
    $("pageCount").textContent = `/ ${pdfDocument.numPages}`;
    $("pageNumber").max = pdfDocument.numPages;
    $("emptyState").hidden = true;
    $("viewerContainer").hidden = false;

    saveRecent(result);
    renderRecent();
    await renderPage();
    await renderThumbnails();

    status(`Loaded ${result.fileName}`);
  } catch (e) {
    console.error(e);
    status("Failed to load PDF");
    alert(`Unable to open PDF:\n${e.message}`);
  }
}

async function renderPage() {
  if (!pdfDocument) return;

  const page = await pdfDocument.getPage(currentPage);
  const viewport = page.getViewport({ scale });

  canvas.width = Math.ceil(viewport.width);
  canvas.height = Math.ceil(viewport.height);

  await page.render({ canvasContext:ctx, viewport }).promise;

  $("pageNumber").value = currentPage;
  $("zoomValue").textContent = `${Math.round(scale * 100)}%`;
  $("prevBtn").disabled = currentPage <= 1;
  $("nextBtn").disabled = currentPage >= pdfDocument.numPages;

  document.querySelectorAll(".thumbnail").forEach(el =>
    el.classList.toggle("active", Number(el.dataset.page) === currentPage)
  );
}

async function goToPage(n) {
  if (!pdfDocument) return;
  n = Number(n);
  if (!Number.isInteger(n) || n < 1 || n > pdfDocument.numPages) {
    $("pageNumber").value = currentPage;
    return;
  }
  currentPage = n;
  await renderPage();
}

async function zoom(delta) {
  if (!pdfDocument) return;
  scale = Math.min(4, Math.max(.25, scale + delta));
  await renderPage();
}

async function fitWidth() {
  if (!pdfDocument) return;
  const page = await pdfDocument.getPage(currentPage);
  const viewport = page.getViewport({ scale:1 });
  scale = Math.min(4, Math.max(.25, ($("viewerContainer").clientWidth - 60) / viewport.width));
  await renderPage();
}

async function renderThumbnails() {
  $("thumbnails").innerHTML = "";
  for (let n = 1; n <= pdfDocument.numPages; n++) {
    const wrapper = document.createElement("div");
    wrapper.className = "thumbnail";
    wrapper.dataset.page = n;

    const thumb = document.createElement("canvas");
    const label = document.createElement("div");
    label.className = "thumbnail-label";
    label.textContent = `Page ${n}`;

    wrapper.append(thumb, label);
    $("thumbnails").appendChild(wrapper);
    wrapper.onclick = () => goToPage(n);

    renderThumbnail(n, thumb);
  }
}

async function renderThumbnail(n, thumb) {
  const page = await pdfDocument.getPage(n);
  const base = page.getViewport({ scale:1 });
  const viewport = page.getViewport({ scale:150 / base.width });
  thumb.width = Math.ceil(viewport.width);
  thumb.height = Math.ceil(viewport.height);
  await page.render({ canvasContext:thumb.getContext("2d"), viewport }).promise;
}

async function searchPdf() {
  if (!pdfDocument) return;

  const query = $("searchInput").value.trim().toLowerCase();
  if (!query) {
    searchResults = [];
    currentMatch = -1;
    $("searchInfo").textContent = "0 results";
    return;
  }

  status("Searching PDF...");
  searchResults = [];

  for (let n = 1; n <= pdfDocument.numPages; n++) {
    const page = await pdfDocument.getPage(n);
    const content = await page.getTextContent();
    const text = content.items.map(x => x.str).join(" ").toLowerCase();

    let from = 0;
    while (true) {
      const index = text.indexOf(query, from);
      if (index < 0) break;
      searchResults.push({ page:n, index });
      from = index + query.length;
    }
  }

  $("searchInfo").textContent = `${searchResults.length} result${searchResults.length === 1 ? "" : "s"}`;

  if (searchResults.length) {
    currentMatch = 0;
    await goToPage(searchResults[0].page);
    status(`Match 1 of ${searchResults.length}`);
  } else {
    currentMatch = -1;
    status("No matches found");
  }
}

async function nextMatch() {
  if (!searchResults.length) return;
  currentMatch = (currentMatch + 1) % searchResults.length;
  await goToPage(searchResults[currentMatch].page);
  status(`Match ${currentMatch + 1} of ${searchResults.length}`);
}

async function previousMatch() {
  if (!searchResults.length) return;
  currentMatch = (currentMatch - 1 + searchResults.length) % searchResults.length;
  await goToPage(searchResults[currentMatch].page);
  status(`Match ${currentMatch + 1} of ${searchResults.length}`);
}

function loadRecent() {
  try { return JSON.parse(localStorage.getItem(RECENT_KEY) || "[]"); }
  catch { return []; }
}

function saveRecent(file) {
  const items = loadRecent().filter(x => x.path !== file.filePath);
  items.unshift({ path:file.filePath, name:file.fileName, openedAt:Date.now() });
  localStorage.setItem(RECENT_KEY, JSON.stringify(items.slice(0, 12)));
}

function renderRecent() {
  const list = loadRecent();
  $("recentList").innerHTML = list.length ? "" :
    '<div style="padding:12px;color:var(--muted)">No recent PDFs</div>';

  for (const item of list) {
    const el = document.createElement("div");
    el.className = "recent-item";
    el.innerHTML = `<div class="recent-name">${escapeHtml(item.name)}</div>
                    <div class="recent-path">${escapeHtml(item.path)}</div>`;
    el.onclick = () => {
      $("recentPanel").classList.add("hidden");
      status("Use Open to select this file again: " + item.path);
    };
    $("recentList").appendChild(el);
  }
}

function escapeHtml(v) {
  return String(v).replaceAll("&","&amp;").replaceAll("<","&lt;")
    .replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;");
}

$("openBtn").onclick = openPdf;
$("emptyOpenBtn").onclick = openPdf;
$("prevBtn").onclick = () => goToPage(currentPage - 1);
$("nextBtn").onclick = () => goToPage(currentPage + 1);
$("pageNumber").onchange = e => goToPage(e.target.value);
$("zoomOutBtn").onclick = () => zoom(-.1);
$("zoomInBtn").onclick = () => zoom(.1);
$("fitBtn").onclick = fitWidth;

$("sidebarBtn").onclick = () => $("sidebar").classList.toggle("collapsed");

$("recentBtn").onclick = () => {
  renderRecent();
  $("recentPanel").classList.remove("hidden");
};
$("closeRecentBtn").onclick = () => $("recentPanel").classList.add("hidden");
$("clearRecentBtn").onclick = () => {
  localStorage.removeItem(RECENT_KEY);
  renderRecent();
};

$("themeBtn").onclick = () => {
  document.body.classList.toggle("light");
  localStorage.setItem(THEME_KEY, document.body.classList.contains("light") ? "light" : "dark");
};

$("searchInput").oninput = () => {
  clearTimeout(searchTimer);
  searchTimer = setTimeout(searchPdf, 350);
};
$("nextMatchBtn").onclick = nextMatch;
$("prevMatchBtn").onclick = previousMatch;
$("closeSearchBtn").onclick = () => {
  $("searchBar").classList.add("hidden");
  $("searchInput").value = "";
  searchResults = [];
  currentMatch = -1;
  $("searchInfo").textContent = "0 results";
};

document.addEventListener("keydown", e => {
  if (e.ctrlKey && e.key.toLowerCase() === "o") {
    e.preventDefault(); openPdf(); return;
  }
  if (e.ctrlKey && e.key.toLowerCase() === "f") {
    e.preventDefault();
    $("searchBar").classList.remove("hidden");
    $("searchInput").focus();
    return;
  }
  if (e.key === "Escape" && !$("searchBar").classList.contains("hidden")) {
    $("closeSearchBtn").click(); return;
  }
  if (!pdfDocument) return;
  if (e.key === "ArrowLeft") goToPage(currentPage - 1);
  if (e.key === "ArrowRight") goToPage(currentPage + 1);
  if (e.key === "+" || e.key === "=") zoom(.1);
  if (e.key === "-") zoom(-.1);
  if (e.key === "Home") goToPage(1);
  if (e.key === "End") goToPage(pdfDocument.numPages);
});

if (localStorage.getItem(THEME_KEY) === "light") document.body.classList.add("light");
renderRecent();