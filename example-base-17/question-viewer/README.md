# Question & Answer Viewer

Uses HTML, Alpine.js, Tailwind CSS, Marked.js (GFM), and DOMPurify.

## Automatic loading
Serve this project over HTTP. The app automatically fetches:
- `data/questions-001.json`
- `data/questions-002.json`
- `data/questions-003.json`
- ...until the next numbered file returns HTTP 404.

Example with Python (no Node.js needed):
```bash
python -m http.server 8000
```
Run this command from the extracted `question-viewer` directory and open `http://localhost:8000`.

## Open without a server
Open `index.html` and click **Select data folder**, then select the included `data` folder. Browsers block `fetch()` from `file://` pages, so folder selection is required in this mode.

## Expected JSON format
Each numbered JSON file must contain an array:
```json
[
  {
    "id": "uuid",
    "category": "Java",
    "title": "Question title",
    "description": "Optional description",
    "answer": "Markdown answer",
    "tags": ["java", "example"]
  }
]
```
