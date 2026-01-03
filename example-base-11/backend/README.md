# Media Files Scanner Backend

A Node.js backend service that scans the E: drive for media files (MP3, MP4, PDF, JPG, JPEG, FLV) and stores their information in a JSON file. Includes a web interface and REST API for browsing and querying the scanned files.

## Features

- Recursively scans the entire E: drive
- Supports multiple file types: MP3, MP4, PDF, JPG, JPEG, FLV
- Collects file information including:
  - Unique slug (for easy identification)
  - Full file path
  - File name
  - File extension
  - Extension type (image, pdf, song, video)
  - File size (bytes and human-readable format)
  - Creation date
  - Last modified date
  - Last accessed date
- Saves all information to `media-files.json`
- Provides scan statistics (total files, total size, scan duration, files by type, files by extension)

## Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the scanner to generate `media-files.json`:
   ```bash
   npm run scan
   ```

3. Start the web server:
   ```bash
   npm start
   ```

The server will start on `http://localhost:3000`

## Usage

### Scanning Files

1. Run the scanner to scan the E: drive:
   ```bash
   npm run scan
   ```
   or directly:
   ```bash
   node src/scanner.js
   ```

2. Wait for the scan to complete. The process will:
   - Scan all directories on the E: drive
   - Find all files with extensions: `.mp3`, `.mp4`, `.pdf`, `.jpg`, `.jpeg`, `.flv`
   - Save the results to `media-files.json` in the backend directory

### Web Interface

1. Start the web server:
   ```bash
   npm start
   ```

2. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

3. Use the web interface to:
   - Browse all scanned files
   - Search files by name or path
   - Filter by file type or extension
   - Sort files by various criteria
   - View detailed file information
   - See statistics and summaries

### API Endpoints

The server provides the following REST API endpoints:

#### Get All Media Files Data
```
GET /api/media-files
```
Returns the complete media files data including statistics.

#### Get Statistics
```
GET /api/stats
```
Returns scan statistics, file counts by type and extension.

#### Get Files (with filters and pagination)
```
GET /api/files?page=1&limit=50&type=video&extension=.mp4&search=keyword&sortBy=size
```
Query parameters:
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 50)
- `type` - Filter by extension type (image, video, song, pdf)
- `extension` - Filter by file extension (.mp4, .mp3, etc.)
- `search` - Search in file name or path
- `sortBy` - Sort field (path, name, size, modified)
- `sortOrder` - Sort order (asc, desc)

#### Get File by Slug
```
GET /api/files/:slug
```
Returns detailed information about a specific file, including navigation to previous/next files.

#### Get Files by Type
```
GET /api/files/type/:type
```
Returns all files of a specific type (image, video, song, pdf).

#### Get Files by Extension
```
GET /api/files/extension/:extension
```
Returns all files with a specific extension.

#### Universal Viewer
```
GET /viewer/:slug
```
Opens a universal viewer page for the specified file. The viewer supports:
- **Images** (JPG, JPEG): Full-screen image viewer
- **Videos** (MP4, FLV): HTML5 video player with controls
- **Audio** (MP3): HTML5 audio player
- **PDFs**: Embedded PDF viewer using iframe

Features:
- Keyboard navigation (Arrow keys for prev/next, Escape to close)
- Fullscreen support for videos
- Download option
- Navigation to previous/next files

#### Serve File Content
```
GET /file/:slug
```
Serves the actual file content. Supports inline viewing and download (with `?download=true` parameter).

#### Health Check
```
GET /health
```
Returns server health status and whether data file exists.

## Output

The scanner creates a `media-files.json` file with the following structure:

```json
{
  "scanDate": "2024-01-01T00:00:00.000Z",
  "drivePath": "E:\\",
  "totalFiles": 150,
  "totalSize": 53687091200,
  "totalSizeFormatted": "50 GB",
  "scanDuration": "45.23 seconds",
  "filesByType": {
    "video": 80,
    "song": 50,
    "image": 15,
    "pdf": 5
  },
  "filesByExtension": {
    ".mp4": 60,
    ".mp3": 50,
    ".jpg": 10,
    ".jpeg": 5,
    ".pdf": 5,
    ".flv": 20
  },
  "files": [
    {
      "slug": "movie1-a1b2c3d4",
      "path": "E:\\Videos\\movie1.mp4",
      "name": "movie1.mp4",
      "extension": ".mp4",
      "extensionType": "video",
      "size": 1073741824,
      "sizeFormatted": "1 GB",
      "created": "2024-01-01T00:00:00.000Z",
      "modified": "2024-01-01T00:00:00.000Z",
      "accessed": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

### File Information Fields

- **slug**: Unique identifier generated from filename and path hash
- **path**: Full file path
- **name**: File name with extension
- **extension**: File extension (e.g., `.mp4`, `.jpg`)
- **extensionType**: Category of file (`image`, `pdf`, `song`, `video`)
- **size**: File size in bytes
- **sizeFormatted**: Human-readable file size
- **created**: File creation timestamp
- **modified**: Last modification timestamp
- **accessed**: Last access timestamp

## Notes

- The scan may take a while depending on the number of files and directories on the E: drive
- Files that cannot be accessed (due to permissions) will be skipped with a warning
- The scanner handles errors gracefully and continues scanning even if some directories fail

## Configuration

To change the drive path, output file, or file extensions, edit the constants at the top of `src/scanner.js`:

```javascript
const DRIVE_PATH = 'E:\\';  // Change to your desired drive/path
const OUTPUT_FILE = path.join(__dirname, '..', 'media-files.json');
const ALLOWED_EXTENSIONS = ['.mp3', '.mp4', '.pdf', '.jpg', '.jpeg', '.flv'];
```

### Extension Types

The scanner automatically categorizes files by type:
- **image**: `.jpg`, `.jpeg`
- **pdf**: `.pdf`
- **song**: `.mp3`
- **video**: `.mp4`, `.flv`

To add more file types, update `ALLOWED_EXTENSIONS` and `EXTENSION_TYPES` in `src/scanner.js`.

## Project Structure

```
backend/
├── src/
│   ├── scanner.js      # File scanner script
│   └── server.js       # Express API server
├── views/
│   └── index.html      # Web interface
├── public/
│   ├── css/
│   │   └── style.css   # Stylesheet
│   └── js/
│       └── app.js      # Frontend JavaScript
├── media-files.json    # Generated scan results
├── package.json
└── README.md
```

## Features

### Web Interface
- **Search & Filter**: Search by name/path, filter by type or extension
- **Sorting**: Sort files by path, name, size, or modification date
- **Pagination**: Navigate through large file lists
- **Statistics**: View comprehensive statistics about scanned files
- **File Details**: View detailed information about individual files
- **Universal Viewer**: Popup viewer for images, videos, audio, and PDFs
- **Responsive Design**: Works on desktop and mobile devices

### API Features
- RESTful API endpoints
- Filtering and searching capabilities
- Pagination support
- CORS enabled for cross-origin requests
- Error handling and validation

