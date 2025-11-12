## Vocab Khajana (Next.js)

This app renders the `khajana.xml` vocabulary file as a paginated study list.
It uses Next.js (App Router), TypeScript, and Tailwind CSS.

### Prerequisites

- Node.js 18.18+ (Next.js 16 requirement)
- npm (ships with Node)

### Install dependencies

```bash
npm install
```

### Run locally

```bash
npm run dev
```

Then open http://localhost:3000 to browse the vocabulary list. Each page
shows 24 entries; use the pagination controls at the bottom to move between
pages. Use the theme toggle in the header to switch between light and dark
themes (defaults to your system preference on first load).

### Project structure

- `public/khajana.xml` – original XML word list.
- `src/lib/khajana.ts` – XML parsing and normalization helpers.
- `src/components/WordCard.tsx` – presentation of a single word entry.
- `src/components/Pagination.tsx` – pagination controls.
- `src/app/page.tsx` – main page rendering and pagination logic.

### Build for production

```bash
npm run build
npm start
```

The production build reads the same XML file at runtime, so ensure
`public/khajana.xml` is deployed alongside the build output.
