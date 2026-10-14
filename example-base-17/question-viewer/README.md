# Question & Answer Viewer V2

## V2 features
- Bookmark questions; bookmarks persist in localStorage.
- Filter by category and tag.
- Search across loaded questions.
- Global question numbering.
- Direct question URLs using `#<question-uuid>` and Copy question link.
- Existing dark/light theme and Marked.js GFM Markdown support.

## Run
Open `index.html` and choose the `data` folder using **Select data folder**, or serve this directory over HTTP:

```bash
python -m http.server 8000
```

Open `http://localhost:8000`. JSON files are loaded from `data/questions-NNN.json`.
