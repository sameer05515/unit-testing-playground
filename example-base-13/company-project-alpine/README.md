# Company & Project Explorer

Interactive frontend for the supplied `data.json`.

## Stack

- HTML
- Alpine.js 3
- Tailwind CSS via CDN
- JSON file as the data source

## Features

- Dashboard summary cards
- Project status distribution
- Company overview
- Company search
- Company → Project relationship
- Project search
- Project status filter
- Project company filter
- Project details modal
- Project detail cards
- Responsive Tailwind UI
- No build step required

## Data

The application reads:

```text
data/data.json
```

The JSON structure is:

```text
companies
projects
projectDetails
```

Relationships:

```text
company.id
    ↓
project.companyId

project.id
    ↓
projectDetail.projectId
```

## Run locally

Because the browser normally blocks `fetch()` from a local `file://` page, run a small HTTP server.

### Option 1: Python

```bash
cd company-project-alpine
python -m http.server 5500
```

Open:

```text
http://localhost:5500
```

### Option 2: Node

If you already have Node.js:

```bash
npx serve .
```

Then open the URL shown by `serve`.

## Important

Tailwind CSS and Alpine.js are loaded from CDNs, so an internet connection is required for the UI libraries.

The actual application data remains local in:

```text
data/data.json
```
