# D3 Charts with ES Modules & Webpack Dev Server

This mini-project shows how to build and bundle interactive D3 visualisations using modern JavaScript tooling. It pairs ES module authoring with Babel + Webpack so you can iterate quickly with `webpack-dev-server` or generate a static bundle that can be served from any HTTP server.

## Features
- ES module entry point (`src/index.js`) that wires together chart modules and shared data utilities.
- D3 v7 chart implementations for bar, line, pie, scatter, area, and stacked bar charts.
- Babel transpilation for modern syntax plus Webpack 5 bundling.
- Dual dev experience: fast reloading via `webpack-dev-server` or watch + lightweight `http-server` combo.

## Project Structure
```
src/
  data/
    generateData.js      # Generates mock data used across charts
  charts/
    barChart.js          # Individual D3 chart modules that return DOM nodes
    lineChart.js
    pieChart.js
    scatterPlot.js
    areaChart.js
    stackedBarChart.js
  index.js               # Bootstraps all charts on DOMContentLoaded
public/
  index.html             # Loads the webpack bundle from /dist/bundle.js
webpack.config.js        # Babel loader + dev server configuration
.babelrc                 # Preset configuration (preset-env)
```

## Prerequisites
- Node.js ≥ 18 (aligns with the workspace recommendation).
- npm ≥ 9.

## Getting Started
```bash
npm install
```

### Run with Webpack Dev Server (recommended)
```bash
npm start
```
- Opens the project on `http://localhost:8080` with hot reloading and source maps.

### Alternate: Static Bundle + Local HTTP Server
```bash
npm run start-dev
```
- Runs `webpack --watch`, outputs `dist/bundle.js`, and serves files from `dist/` via `http-server` on `http://localhost:6060`.
- Useful when you want to inspect the generated bundle or mimic a production setup.

### Build Only
```bash
npm run build
```
- Emits `dist/bundle.js` without starting any servers.

## Available npm Scripts
- `npm start` → `webpack-dev-server` with live reload.
- `npm run start-dev` → concurrently runs `webpack --watch` and `http-server dist -p 6060`.
- `npm run start-my-webpack` → manual `webpack --watch` without serving files.
- `npm run start-http-server` → serve the existing `dist/` folder (expects a bundle to already exist).
- `npm run build` → one-off, optimized bundle suitable for deployment.

## How the Charts Work
- `generateData.js` creates an array of objects with labels and values. Additional derived datasets (e.g. for stacked bar charts) are built in `index.js` before rendering.
- Each chart module exports a function that accepts data and returns a fully configured DOM node. This keeps chart logic isolated and easy to reuse or swap.
- `src/index.js` listens for `DOMContentLoaded`, then appends each chart module output to the document body in sequence.

## Troubleshooting Tips
- **Port already in use**: pass `--port <number>` to `webpack serve` or stop the conflicting process. Example: `npm start -- --port 9090`.
- **Bundle not updating**: make sure you are running either `npm start` or `npm run start-dev`; both watch for source changes.
- **Blank page**: check the browser console—missing DOM nodes usually mean the bundle failed to load. Confirm `dist/bundle.js` exists and that the server logs show a successful compile.

## Next Steps
- Extend `generateData.js` with real data sources or API calls.
- Add more chart modules and import them in `index.js`.
- Configure Webpack to split bundles, add CSS loaders, or integrate TypeScript for stricter typing.

Happy charting!