# MP4 Scanner Backend

A Node.js backend service that scans the E: drive for all MP4 files and stores their information in a JSON file.

## Features

- Recursively scans the entire E: drive
- Collects file information including:
  - Full file path
  - File name
  - File size (bytes and human-readable format)
  - Creation date
  - Last modified date
  - Last accessed date
- Saves all information to `mp4-files.json`
- Provides scan statistics (total files, total size, scan duration)

## Installation

No dependencies required! This project uses only Node.js built-in modules (`fs` and `path`).

## Usage

1. Make sure you have Node.js installed (v12 or higher recommended)

2. Run the scanner:
   ```bash
   npm start
   ```
   or
   ```bash
   npm run scan
   ```
   or directly:
   ```bash
   node src/scanner.js
   ```

3. Wait for the scan to complete. The process will:
   - Scan all directories on the E: drive
   - Find all `.mp4` files
   - Save the results to `mp4-files.json` in the backend directory

## Output

The scanner creates a `mp4-files.json` file with the following structure:

```json
{
  "scanDate": "2024-01-01T00:00:00.000Z",
  "drivePath": "E:\\",
  "totalFiles": 150,
  "totalSize": 53687091200,
  "totalSizeFormatted": "50 GB",
  "scanDuration": "45.23 seconds",
  "files": [
    {
      "path": "E:\\Videos\\movie1.mp4",
      "name": "movie1.mp4",
      "size": 1073741824,
      "sizeFormatted": "1 GB",
      "created": "2024-01-01T00:00:00.000Z",
      "modified": "2024-01-01T00:00:00.000Z",
      "accessed": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

## Notes

- The scan may take a while depending on the number of files and directories on the E: drive
- Files that cannot be accessed (due to permissions) will be skipped with a warning
- The scanner handles errors gracefully and continues scanning even if some directories fail

## Configuration

To change the drive path or output file, edit the constants at the top of `src/scanner.js`:

```javascript
const DRIVE_PATH = 'E:\\';  // Change to your desired drive/path
const OUTPUT_FILE = path.join(__dirname, '..', 'mp4-files.json');
const FILE_EXTENSION = '.mp4';  // Change to scan for other file types
```

