## Combined Observer JPG to PDF

This project automates a two-step workflow for managing scanned comic pages on Windows:
- A directory observer watches for new `.jpg` files in a staging folder, renames them to a numeric sequence, and moves them into a comic-specific image directory.
- A batch converter stitches every numbered image folder into a single PDF using `pdf-lib`.

The scripts are orchestrated with simple `npm` commands, making it easy to streamline manual image-to-PDF processing.

### Prerequisites
- Node.js 18 or newer (tested on Windows PowerShell)
- Access to the local folders referenced in `src/common/utils.js` (update them to match your environment)

### Installation
```powershell
cd example-base-05/combined-observer-jpg-to-pdf
npm install
```

### Configuration
Edit `src/common/utils.js` before running the scripts:
- Update `WATCH_DIRECTORY` to the folder you want to monitor for new `.jpg` files.
- Set `OUTPUT_DIRECTORY` to the destination folder that should receive the renamed images.
- Optionally adjust `folder_names` and the generated `outputFolderNames` array to point to the input folders that contain the numbered images you want to convert to PDF.

All configured paths are absolute Windows paths; relative paths are not currently supported.

### Usage
- Start the watcher (runs until you stop it):
  ```powershell
  npm run observe
  ```
  Drops every `.jpg` file from `WATCH_DIRECTORY` into `OUTPUT_DIRECTORY`, renaming them sequentially.

- Convert one or more folders of numbered images into PDFs:
  ```powershell
  npm run convert-to-pdf
  ```
  The command iterates over `outputFolderNames`, reading images from each `inputFolder` and writing a PDF to `outputFolder` with `outputFileName`. Ensure each folder only contains `.jpg` files named with numbers (`1.jpg`, `2.jpg`, …) to preserve page order.

### Workflow Tips
- Keep the watcher running while scanning or downloading images; it automatically numbers files in the order they arrive.
- Run the converter after a folder is complete. Because the converter currently launches all conversions in parallel, avoid editing the source folders while the script runs.
- For large image sets, verify available disk space before generating PDFs.

### Troubleshooting
- **Watcher prints “Skipping file”**: The file extension is not `.jpg`. Rename or remove the file.
- **PDF generation logs “No JPG files found”**: Confirm the `inputFolder` path is correct and contains numbered `.jpg` files.
- **Path errors**: Revisit `src/common/utils.js` and ensure every absolute path exists on your machine.

### Future Improvements
- Externalize path configuration (e.g., environment variables or a JSON config).
- Add unit tests for file naming and conversion routines.
- Improve image sorting to handle non-numeric file names.
- Replace the parallel `forEach` invocation in the converter with a controlled promise flow for better error handling.


