# 100 Java Coding Questions — Answers

## Run locally

1. Extract the ZIP.
2. Start a local static server from this directory (recommended, because the page fetches `data/questions.json`).
   - Python: `python -m http.server 8000`
   - Node: `npx serve .`
3. Open `http://localhost:8000`.

The page uses HTML, Alpine.js, Tailwind CSS, and highlight.js via CDN. Marked is included for future Markdown rendering; the current solutions are rendered as code blocks to preserve Java formatting.

Features: 100 solutions, category filter, search, expand/collapse, copy-code button, light/dark mode, and locally saved completion progress.

Java snippets are intended as interview solutions and may need imports or a class wrapper. A few questions specify assumptions in the explanation.


## Multiple question JSON files

Question data is stored in numbered JSON files under `data/`:

- `questions-000.json` — the original 100 questions
- `questions-001.json` — 10 additional questions

The app automatically requests `questions-000.json`, `questions-001.json`, `questions-002.json`, and so on, stopping at the first missing file (HTTP 404). To add another batch, create the next sequential file, such as `questions-002.json`. Keep numbering contiguous; do not skip a number.

Each file can be either a JSON array of question objects or an object containing a `questions` array. Questions should have unique `id` values, plus `category`, `question`, `answer`, and `explanation`. Optional fields such as `title`, `tags`, `difficulty`, and `complexity` are supported. Search, category filters, answer expansion, copy-code, and completion tracking operate across the combined question list.

Serve the folder over HTTP (for example, `python -m http.server 8000`) rather than opening `index.html` with `file://`, because browsers restrict `fetch()` from local files.
