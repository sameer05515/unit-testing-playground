## Shrimad Bhagwat Geeta

This project is a single-page AngularJS application that presents summaries, verses, and word meanings from the Shrimad Bhagavad Gita. All content is served from local JSON files and audio assets bundled alongside the app.

### Features
- Chapter summaries rendered from `data/json/chapter-summary.json`.
- Detailed chapter and verse pages with navigation between chapters/verses.
- Inline Sanskrit text, translations, and commentary, with supporting audio playback for each verse.
- Word-meaning explorer that cross-links verse references.

### Project Structure
- `index.html` – entry point that wires the AngularJS app and vendor libraries.
- `module/script.js` – AngularJS module definition, route configuration, and controllers.
- `partials/` – HTML partials for the home, chapter, verse, and word-meaning views.
- `data/json/` – JSON data sources that drive page content.
- `audio/` – verse audio files referenced by the verse view.
- `lib/` – locally vendored CSS and JavaScript dependencies (AngularJS, Bootstrap, etc.).

### Prerequisites
Because the app fetches JSON over HTTP, you must run it behind a static web server. Any lightweight server will do; below are two common options:

- **Node.js**: `npx http-server . -p 8080`
- **Python 3**: `python -m http.server 8080`

Run the server from the project root (`example-base-05/ShrimadBhagwatGeeta`) and then open `http://localhost:8080` in your browser.

### Development Notes
- Routes expect data IDs in the JSON files (e.g., chapter IDs) to remain consistent; updating the data structure may require corresponding controller changes.
- Audio playback URLs in `chapter-verse-detail-temp.json` must point to the bundled files in `audio/`.
- Vendor libraries are checked into `lib/`; no package manager is required, but be mindful of their versions if you plan upgrades.

### Suggested Enhancements
- Add defensive checks in controllers for missing/invalid IDs to avoid runtime errors.
- Improve the verse audio loop toggle by binding to the DOM attribute with `ng-attr-loop`.
- Consider migrating to a modern frontend stack or serving data from an API for easier maintenance.

