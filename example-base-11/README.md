# Media Files Browser

A full-stack application for scanning, browsing, and managing media files (MP3, MP4, PDF, JPG, JPEG, FLV) from your file system.

## Project Structure

```
example-base-11/
├── backend/          # Node.js/Express backend API
└── frontend-vue/     # Vue.js 3 frontend application
```

## Features

- **File Scanning**: Recursively scan E: drive for media files
- **File Browsing**: Browse files with filtering, searching, and sorting
- **Universal Viewer**: View images, videos, audio, and PDFs in a modal
- **File Management**: Delete single or multiple files
- **Statistics**: View scan statistics and file type breakdowns
- **Deleted Files History**: Track deleted files with timestamps

## Prerequisites

- Node.js 18+ and npm
- Windows (configured for E: drive scanning)

## Quick Start

### 1. Start the Backend

```bash
cd backend
npm install
npm start
```

The backend will run on `http://localhost:3000`

### 2. Start the Vue Frontend

In a new terminal:

```bash
cd frontend-vue
npm install
npm run serve
```

The frontend will run on `http://localhost:5173`

### 3. Access the Application

Open your browser and navigate to:
- **Vue Frontend**: http://localhost:5173
- **Original HTML Frontend**: http://localhost:3000

## Backend API Endpoints

### Files
- `GET /api/files` - Get files with filters, pagination, and sorting
- `GET /api/files/:slug` - Get file details
- `DELETE /api/files/:slug` - Delete a file
- `POST /api/files/bulk-delete` - Delete multiple files
- `GET /api/files/type/:type` - Get files by type
- `GET /api/files/extension/:extension` - Get files by extension

### Statistics
- `GET /api/stats` - Get scan statistics

### Scanning
- `POST /api/scan/start` - Start a new scan
- `GET /api/scan/status` - Get scan status
- `POST /api/scan/reset` - Reset scan status

### Deleted Files
- `GET /api/deleted-files` - Get deleted files list

### File Serving
- `GET /file/:slug` - Serve file content (with optional `?download=true`)

## Vue Frontend Routes

- `/` - Files browser (main view)
- `/scan` - Scan configuration and status
- `/deleted` - Deleted files history

## Configuration

### Backend

Edit `backend/src/scanner.js` to change:
- `DRIVE_PATH` - Drive to scan (default: `E:\\`)
- `ALLOWED_EXTENSIONS` - File extensions to scan
- `EXCLUDE_DIRS` - Directories to exclude (via environment variable)

### Frontend

The Vue frontend uses Vite with proxy configuration. API requests are automatically proxied to `http://localhost:3000`.

## Development

### Backend Development

```bash
cd backend
npm start
```

### Frontend Development

```bash
cd frontend-vue
npm run serve
```

### Build Frontend for Production

```bash
cd frontend-vue
npm run build
```

The built files will be in `frontend-vue/dist/`

## Technologies

### Backend
- Node.js
- Express.js
- File System (fs)
- Child Process (for background scanning)

### Frontend (Vue)
- Vue.js 3
- Vue Router 4
- Axios
- Bootstrap 5
- Bootstrap Icons
- Vite

## File Structure

### Backend
- `src/scanner.js` - File system scanner
- `src/scanService.js` - Background scan service
- `src/server.js` - Express API server
- `views/` - HTML templates (original frontend)
- `public/` - Static assets (original frontend)

### Frontend (Vue)
- `src/App.vue` - Root component
- `src/main.js` - Application entry point
- `src/api/mediaFiles.js` - API client
- `src/views/FilesBrowser.vue` - Main browser view
- `src/views/ScanView.vue` - Scan management view
- `src/views/DeletedFiles.vue` - Deleted files view

## Notes

- The scanner creates `media-files.json` with all found files
- Deleted files are tracked in `deleted-files.json`
- Both JSON files are in the `backend/` directory
- The Vue frontend communicates with the backend via REST API
- CORS is enabled on the backend to allow frontend requests

