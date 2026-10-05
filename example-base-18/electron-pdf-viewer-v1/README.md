# Electron PDF Viewer V1

## Fixed version

This version fixes the PDF.js `getOrInsertComputed is not a function` error by pinning PDF.js to `4.10.38`, before the newer Map upsert API usage that causes the error in some Chromium/Electron runtimes.

It also reads the selected PDF in Electron's main process and transfers the bytes to the renderer instead of using `fetch(file://...)`.

## Requirements

- Node.js 18+
- npm

## Run

```bash
npm install
npm start
```

## Features

- Open local PDF
- Render PDF using PDF.js
- Previous / Next page
- Jump to page
- Zoom in / out
- Fit page width
- Keyboard navigation
  - Left / Right: previous/next page
  - Home: first page
  - End: last page
  - + / -: zoom
  - Ctrl + O: open PDF
