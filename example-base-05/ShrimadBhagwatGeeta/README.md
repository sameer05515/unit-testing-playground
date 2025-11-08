# Shrimad Bhagwat Geeta (Angular + Bootstrap 5)

Modern Angular 18 SPA that presents Shrimad Bhagavad Gita content—chapter summaries, detailed verses with audio recitation, and cross-linked Sanskrit word meanings—using locally bundled JSON and media assets.

## Quick Start

```bash
npm install
npm start            # alias for ng serve
```

Open `http://localhost:4200/` in your browser. HMR reloads pages as you edit.

### Production Build

```bash
npm run build
```

Artifacts land in `dist/smbg`. Serve the contents of that folder with any static web server.

## Project Structure Highlights

- `src/app/pages/home` – landing page with hero, Hindi introduction, and chapter grid.
- `src/app/pages/chapter` – chapter view with descriptions and per-verse teasers.
- `src/app/pages/verse` – detailed verse experience with audio playback, translations, and commentary.
- `src/app/pages/word-meaning` – occurrences table for Sanskrit words with deep links.
- `src/app/services/gita-data.service.ts` – memoised HTTP service that loads JSON data and normalises legacy hash URLs.
- `src/assets/data/json` – canonical JSON data transferred from the AngularJS build.
- `src/assets/audio` – bundled MP3 recitations referenced by verse detail JSON.

All routes are configured in `src/app/app.routes.ts` and use Angular’s standalone component model.

## Notes on the Migration

- Legacy AngularJS assets were removed; Angular CLI scaffolding is now the source of truth.
- Bootstrap 5 styling is provided via SCSS imports (`src/styles.scss`); navbar collapse behaviour is handled with a lightweight Angular signal—no Bootstrap JS required.
- Static JSON still contains hash-based URLs; the data service translates these into Angular router commands.
- Audio paths are resolved relative to `assets/` to ensure builds serve media correctly.

## Data Integrity & Extensibility

- JSON structure assumptions are encoded in TypeScript interfaces under `src/app/models`.
- When updating JSON, keep `id` fields stable—they power deep-link routing.
- New UI features can be added as standalone components and wired in via the router.

## Available NPM Scripts

| Script          | Description                                  |
|-----------------|----------------------------------------------|
| `npm start`     | Runs `ng serve` with live reload             |
| `npm run build` | Production build with optimization           |
| `npm run test`  | Placeholder (no tests yet)                   |

## Next Ideas

- Add unit tests around `GitaDataService` to catch malformed JSON early.
- Introduce lazy-loaded feature routes once content grows beyond current scope.
- Enhance accessibility by expanding ARIA labelling, especially around dynamic verse content.
