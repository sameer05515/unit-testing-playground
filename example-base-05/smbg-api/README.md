# Shrimad Bhagwat Geeta API

A Node.js + EJS application providing RESTful API and web interface for Shrimad Bhagwat Geeta content.

## Features

- 📚 RESTful API endpoints for chapters and verses
- 🌐 Web interface with EJS templates
- 📖 Chapter listing and detail pages
- 📝 Verse detail pages with translations and meanings
- 🎨 Modern UI with Tailwind CSS

## Prerequisites

- Node.js 18 or higher
- npm or yarn

## Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the server:
   ```bash
   npm start
   ```

   Or for development with auto-reload:
   ```bash
   npm run dev
   ```

3. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

## API Endpoints

### Chapters

- `GET /api/chapters` - Get all chapters summary
- `GET /api/chapters/:id` - Get chapter by ID
- `GET /api/chapters/:id/verses` - Get chapter verses summary
- `GET /api/chapters/:id/verses/summary` - Get chapter verses summary (alternative endpoint)
- `GET /api/chapters/:id/verses/:verseId` - Get verse details

### Word Meanings

- `GET /api/word-meaning/:wordId` - Get word meaning details

### Examples

- Get all chapters: `http://localhost:3000/api/chapters`
- Get chapter 1: `http://localhost:3000/api/chapters/1`
- Get verses of chapter 1: `http://localhost:3000/api/chapters/1/verses`
- Get verse 1.1: `http://localhost:3000/api/chapters/1/verses/1`
- Get word meaning: `http://localhost:3000/api/word-meaning/a-kāraḥ`

## API Documentation

The application includes Swagger UI and Redoc documentation:

- **Swagger UI**: http://localhost:3000/swagger-ui
- **Redoc**: http://localhost:3000/redoc
- **OpenAPI JSON**: http://localhost:3000/api-docs/swagger.json

### Quick Links

- `/swagger-ui` - Interactive Swagger UI documentation
- `/redoc` - Beautiful Redoc documentation
- `/api-docs/swagger.json` - OpenAPI specification in JSON format

## Web Interface

- `/` - Home page with API documentation
- `/chapters` - List all chapters
- `/chapters/:id` - Chapter detail page
- `/chapters/:id/verses/:verseId` - Verse detail page
- `/word-meaning/:wordId` - Word meaning detail page with occurrences

## Project Structure

```
smbg-api/
├── src/
│   └── data/
│       └── json/          # JSON data files
├── views/                 # EJS templates
│   ├── index.ejs
│   ├── chapters.ejs
│   ├── chapter.ejs
│   ├── verse.ejs
│   ├── 404.ejs
│   └── 500.ejs
├── public/                # Static files
├── server.js             # Main server file
├── package.json
└── README.md
```

## Data Files

The following JSON files are used:

- `chapter-summary.json` - Summary of all chapters
- `chapter-verse-summary.json` - Summary of verses for each chapter
- `chapter-verse-detail.json` - Detailed verse information
- `chapter-verse-detail-with-mp3.json` - Verse details with audio links
- `hi/chapter-summary.json` - Hindi chapter summary

## Technologies Used

- **Express.js** - Web framework
- **EJS** - Template engine
- **Tailwind CSS** - Styling (via CDN)
- **Node.js** - Runtime environment

## License

ISC

