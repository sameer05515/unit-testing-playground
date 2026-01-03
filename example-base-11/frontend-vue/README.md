# Media Files Browser - Vue.js Frontend

Vue.js 3 frontend application for browsing and managing media files.

## Features

- Browse media files with filtering and sorting
- Search files by name or path
- Filter by type, extension, and size
- View file details
- Universal viewer for images, videos, audio, and PDFs
- Delete single or multiple files
- Scan media files from E: drive
- View deleted files history

## Prerequisites

- Node.js 18+ and npm
- Backend server running on `http://localhost:3000`

## Installation

```bash
cd frontend-vue
npm install
```

## Development

Start the development server:

```bash
npm run serve
```

The app will be available at `http://localhost:5173`

The Vite dev server is configured to proxy API requests to the backend at `http://localhost:3000`.

## Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
frontend-vue/
├── src/
│   ├── api/
│   │   └── mediaFiles.js      # API client for backend
│   ├── views/
│   │   ├── FilesBrowser.vue   # Main files browser view
│   │   ├── ScanView.vue       # Scan configuration and status
│   │   └── DeletedFiles.vue   # Deleted files history
│   ├── App.vue                # Root component with router
│   └── main.js                # Application entry point
├── index.html
├── vite.config.js
└── package.json
```

## API Integration

The frontend uses the following backend APIs:

- `GET /api/stats` - Get statistics
- `GET /api/files` - Get files with filters and pagination
- `GET /api/files/:slug` - Get file details
- `DELETE /api/files/:slug` - Delete single file
- `POST /api/files/bulk-delete` - Delete multiple files
- `GET /api/deleted-files` - Get deleted files list
- `POST /api/scan/start` - Start scan
- `GET /api/scan/status` - Get scan status

## Routes

- `/` - Files browser (main view)
- `/scan` - Scan configuration and status
- `/deleted` - Deleted files history

