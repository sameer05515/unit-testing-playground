# JavaScript Coding Questions & Answers

A static interview-practice application with 50 JavaScript coding questions.

## Features
- 50 coding questions with UUID IDs, answers, explanations, complexity notes, tags, and difficulty
- Search across titles, questions, answers, explanations, categories, and tags
- Category and difficulty filters
- Expand/collapse answers and copy code
- Syntax highlighting
- Completion progress stored in browser localStorage
- Light/dark theme preference persisted across reloads
- HTML + Alpine.js + Tailwind CSS, with JSON question data
- Sequential `questions-NNN.json` file loading

## Run locally
Serve the project over HTTP because the browser fetches JSON files. From this directory, run:

```bash
python -m http.server 8000
```

Then open http://localhost:8000.

## Add more questions
Add `data/questions-001.json`, then `questions-002.json`, etc. Keep numbering consecutive starting from `questions-000.json`. Each file can be a JSON array or an object with a `questions` array. Every new question should have a unique UUID `id`; display numbers are generated automatically.

## Notes
The app uses CDN-hosted libraries, so an internet connection is needed for Alpine.js, Tailwind CSS, and highlight.js. No backend is required.
