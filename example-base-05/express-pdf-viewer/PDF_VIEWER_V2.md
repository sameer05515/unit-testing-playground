# PDF Viewer V2

V2 adds persistent reading progress, PDF text search, categories and tags, recently opened documents, text highlights and notes, a reading dashboard, and a saved dark/light theme. The original `/pdf-viewer/v1/` route and its `bookmark.json` storage remain in place.

## Run

```bash
npm install
npm run dev:v2
```

Open `http://localhost:3000/pdf-viewer/v2/`. PDF source files continue to come from `PDF_DIRECTORY_PATH` in `.env` (defaults are defined in `src/common/constants.js`). V2 uses PDF.js from cdnjs, so the browser needs access to that CDN.

## Persistent files

- `bookmark.json` — shared with V1 for backward compatibility.
- `pdf-viewer-data/reading-progress.json` — last page and completion status per PDF.
- `pdf-viewer-data/categories-tags.json` — category and tags per PDF.
- `pdf-viewer-data/recently-opened.json` — recently opened PDFs.
- `pdf-viewer-data/annotations.json` — selected-text highlights and notes by PDF/page.
- `pdf-viewer-data/settings.json` — theme preference.

The `pdf-viewer-data` directory is created automatically on first write. Back it up along with `bookmark.json` to preserve reader data.

## Notes

- Text search scans the currently selected PDF and opens the first matching page.
- Highlights are stored against selected text and page. Exact visual matching may vary for PDFs whose text is split into unusual glyph runs.
- The browser PDF.js viewer supports selectable text; scanned image-only PDFs require OCR before text search/highlighting can work.
