# Axios Study Playground

Collection of small projects used to explore `axios` from different angles: plain browser scripts, a typed Vite sandbox, and a React + Chart.js dashboard. Each folder is self-contained; install dependencies per project.

## Projects

### `axios-crash`
- Static copy of Brad Traversy’s crash course demo.
- Showcases core `axios` features (CRUD requests, simultaneous calls, interceptors, cancellation, error handling) against `https://jsonplaceholder.typicode.com`.
- Use the completed example in `index.html` + `main.js`, or practice by wiring up `start.js`.
- **Run:** open `index.html` in a browser or via a local static server (e.g. VS Code Live Server).

### `axios-study-in-ts-lib`
- Vite + TypeScript playground that experiments with strongly typed request helpers (see `src/lib/axios1.ts`).
- Includes study notes and video references in `index.md`.
- **Install:** `npm install`
- **Develop:** `npm run dev`
- **Build:** `npm run build`
- Tested with Node.js 18+. Uses the default Vite preview server for production verification (`npm run preview`).

### `react-ts-with-axios`
- Create React App written in TypeScript for exploring API typing in a richer UI.
- Fetches market data from the public CoinGecko API and renders interactive summaries via `CryptoSummary`.
- **Install:** `npm install`
- **Develop:** `npm start`
- **Test:** `npm test`
- **Build:** `npm run build`

## Notes
- These projects intentionally do not share dependencies; install packages per folder.
- External APIs (`jsonplaceholder.typicode.com`, `api.coingecko.com`) are unauthenticated but rate-limited—retry later if requests fail.
- Additional learning resources and timestamps live in `axios-study-in-ts-lib/index.md`.

