# Khajana Word Meaning — HTML + Alpine.js + Tailwind CSS

A lightweight vocabulary explorer built with:

- HTML5
- Alpine.js 3
- Tailwind CSS CDN
- XML DOMParser
- No backend
- No build step

The supplied `khajana.xml` contains the vocabulary records. The XML structure includes
`myword`, `word`, `meanings`, and `examples` elements. The first records, for example,
contain words such as `abase`, `abate`, and `abdicate`.

## Dataset

The included `data/khajana.xml` contains approximately 1034 `<myword>` entries.

## Features

- Search by word
- Search by meaning
- Search by example
- Filter by part of speech
- Paginated word cards
- Word detail view
- Multiple meanings
- Example sentences
- Random word
- Responsive Tailwind UI
- No framework/build dependency

## Run

Because browsers normally block `fetch()` for local `file://` pages, run a tiny local HTTP server.

### Option 1 — Python

```bash
python -m http.server 8000
```

Open:

http://localhost:8000

### Option 2 — Node.js

```bash
npx serve .
```

Then open the URL shown by the command.

## Project structure

```text
khajana-word-meaning/
├── data/
│   └── khajana.xml
├── index.html
└── README.md
```

## XML format expected

```xml
<myword>
    <word type="verb"><![CDATA[abase]]></word>
    <meanings>
        <meaning><![CDATA[to humiliate]]></meaning>
        <meaning><![CDATA[degrade]]></meaning>
    </meanings>
    <examples>
        <example><![CDATA[Example sentence...]]></example>
    </examples>
</myword>
```
