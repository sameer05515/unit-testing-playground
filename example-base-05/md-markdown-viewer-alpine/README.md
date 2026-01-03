# Markdown Viewer - Alpine.js Client

A lightweight Alpine.js client for viewing markdown files from the markdown viewer API.

## Features

- 🚀 Pure Alpine.js (no framework overhead)
- 📱 Responsive design with Bootstrap 5
- 🎨 Dark theme
- 🔍 Search/filter functionality
- 📄 Syntax highlighting with Prism.js
- 🔄 Auto-refresh capabilities
- 🔗 URL-based navigation

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The app will be available at `http://localhost:5174`

### Production Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## API Configuration

The client expects the API server to be running at `http://localhost:3030` by default. This is configured via Vite's proxy in `vite.config.js`.

To use a different API base URL, set the `VITE_API_BASE` environment variable:

```bash
VITE_API_BASE=http://your-api-server:3030 npm run dev
```

## API Endpoints

The client consumes the following endpoints:

- `GET /api/files` - Get all markdown files
- `GET /api/files/{slug}` - Get markdown file content by slug

## Technologies

- [Alpine.js](https://alpinejs.dev/) - Minimal JavaScript framework
- [Bootstrap 5](https://getbootstrap.com/) - CSS framework
- [Marked](https://marked.js.org/) - Markdown parser
- [Prism.js](https://prismjs.com/) - Syntax highlighting
- [Vite](https://vitejs.dev/) - Build tool

