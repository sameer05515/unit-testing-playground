# promise-practice

Vanilla JavaScript playground that experiments with Promises, dynamic script loading, and DOM utilities. The `src/index.html` entrypoint renders a minimal page and then drives the experience through self-executing scripts. A selector populated from `globalConstants.SCRIPTS_OPTIONS` lets you load any of the demo scripts on demand.

## Highlights

- Promise basics: multiple `basic-promise-syntax*.js` and `promiseChain-example*.js` scripts walk through resolving/rejecting flows, chaining, and `Promise.allSettled`.
- Reusable utilities: `utility-v1.js` exposes helper modules (`counterUtility`, `globalHelperUtility`, `elementAdderUtility`) that the demos consume to generate IDs, convert HTML to JSON, and append styled elements with async guarantees.
- Dynamic loader: `scripts6-self-executing-with-utility-with-style.js` builds the UI, loads selected demos via Promises, and tears down previously injected DOM/script tags to keep the page clean.
- Fetch examples: scripts under `scripts/custom/fetch-api-learning/` integrate with the companion `nodejs-backend` project to practice Promise-based HTTP calls.
- Additional HTML experiments live under `sample-htmls/` for targeted DOM manipulation and context-menu trials without touching the main selector flow.

## Project Structure

- `src/index.html` – Minimal shell that defers to the loader script.
- `src/scripts/lib/` – Shared helpers (`utility-v1.js`, `utility-v2.js`).
- `src/scripts/custom/` – Individual demos (Promise patterns, DOM utilities, fetch examples, attendance visualisations, etc.).
- `src/sample-htmls/` – Standalone HTML playgrounds for specific scenarios.
- `docs/` – Reserved for future write-ups/examples.

## Running the Demos

1. Install dependencies (only needed if you plan to add packages later):
   ```powershell
   npm install
   ```
2. Serve the `src` directory with any static server (recommended to avoid `file://` CORS for the fetch demos):
   ```powershell
   npx http-server ./src --port 8080
   ```
   Then open `http://localhost:8080` and pick a script from the dropdown.

### Using the Fetch Samples

Some scripts expect the Express sample in `../nodejs-backend` to be running at `http://localhost:3000`. If you need those endpoints:

```powershell
cd ../nodejs-backend
npm install
npm run start
```

With the API running, return to the Promise playground page and execute any of the `fetch-api-learning/*` demos.

## Tips

- Open the browser console to observe logs, resolved values, and errors from the Promise exercises.
- When authoring new demos, add your script under `src/scripts/custom/` and append its filename to `globalConstants.scriptNames` in `src/scripts/lib/utility-v1.js` so it appears in the selector automatically.
- If you prefer to work with the standalone HTML samples, open the files under `src/sample-htmls/` directly in the browser or through the same static server.


