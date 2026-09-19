# Khajana Vocabulary Learning — V2

HTML + Alpine.js + Tailwind CSS vocabulary application using the supplied `khajana.xml`.

Detected vocabulary entries: **1034**

## Features

- Favorites / bookmarks using `localStorage`
- Word of the Day
- 10-question MCQ vocabulary quiz
- Quiz score and accuracy tracking
- Browser SpeechSynthesis pronunciation
- Dark / Light mode persisted in `localStorage`
- Keyboard navigation
  - `Arrow Down` from search → first result
  - `Enter` / `Space` → open focused word
  - `Escape` → clear search
- Recently viewed words
- LocalStorage learning progress
- Search across word, meanings and examples
- Part-of-speech filter
- Pagination
- Random word
- Responsive Tailwind UI

## Run

Do not open `index.html` directly because the browser may block XML `fetch()` under `file://`.

### Python

```bash
python -m http.server 8000
```

Open:

```text
http://localhost:8000
```

### Node.js

```bash
npx serve .
```

## Structure

```text
khajana-word-meaning-v2/
├── data/
│   └── khajana.xml
├── index.html
└── README.md
```

## localStorage keys

```text
khajana.favorites
khajana.recent
khajana.progress
khajana.dark
```

## Pronunciation

The app uses the browser's Web Speech API / SpeechSynthesis. Availability and voice selection depend on the browser and operating system.

## Quiz

Each quiz selects 10 random words. The first meaning in the XML is treated as the correct answer, while three meanings from other words are used as distractors.

The quiz score is persisted in localStorage.
