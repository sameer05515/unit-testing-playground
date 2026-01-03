# Markdown Viewer - Angular Client

An Angular client application for viewing markdown files from the markdown viewer API.

**Note:** This project uses Angular standalone components. To run this project, you'll need to use Angular CLI instead of Vite directly, or set up proper Angular build tooling.

## Quick Setup with Angular CLI

The easiest way to run this project is using Angular CLI:

```bash
npm install -g @angular/cli
ng new md-markdown-viewer-angular --skip-git --routing=false --style=css
```

Then copy the `src/app` directory from this project.

## Alternative: Use Angular CLI Build

1. Install Angular CLI:
```bash
npm install -g @angular/cli
```

2. Generate a new Angular project:
```bash
ng new md-markdown-viewer-angular --skip-git --routing --style=css
```

3. Copy the source files from this project to the new CLI project.

## Features

- 🅰️ Angular 17+ with standalone components
- 📱 Responsive design with Bootstrap 5
- 🎨 Dark theme
- 🔍 Search/filter functionality
- 📄 Syntax highlighting with Prism.js
- 🔄 Auto-refresh capabilities
- 🔗 URL-based navigation

## API Configuration

The client expects the API server to be running at `http://localhost:3030` by default.

## API Endpoints

The client consumes the following endpoints:

- `GET /api/files` - Get all markdown files
- `GET /api/files/{slug}` - Get markdown file content by slug

## Technologies

- [Angular](https://angular.io/) - Frontend framework
- [Bootstrap 5](https://getbootstrap.com/) - CSS framework
- [Marked](https://marked.js.org/) - Markdown parser
- [Prism.js](https://prismjs.com/) - Syntax highlighting
