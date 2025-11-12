# Promise Practice (CommonJS + Webpack)

Node-based playground that mirrors the vanilla `promise-practice` examples while leaning on CommonJS modules and Webpack 5 for bundling. The project compiles everything under `src/scripts/**` into the `dist/` folder (one bundle per file) and then demonstrates dynamic script loading, Promise exercises, and a D3 chart suite.

## Getting Started

```powershell
cd promise-practice-with-commonjs-webpack
npm install
npm start
```

`npm start` runs Webpack in watch mode using `webpack.config.js`. Every script inside `src/scripts/` (including nested folders) becomes an entry point and is emitted to `dist/` with the same folder structure.

If you prefer a one-off build:

```powershell
npx webpack --config webpack.config.js
```

## Project Highlights

- **Dynamic entry resolution** – `webpack.config.js` scans `src/scripts/**` with `glob`, so dropping a new script file automatically creates a bundle under `dist/`.
- **CommonJS utilities** – Shared helpers live under `src/modules/`, organised by version (`v1`, `v2`) and feature (`basic`, `d3-practice`).
- **Interactive selector UI** – `src/scripts/app.js` (referenced by `src/htmls/main.html`) renders a dropdown populated by `SCRIPTS_OPTIONS` from `src/modules/v1/globalConstants.js`. Picking an option loads the corresponding bundle from `dist/custom/` and injects it into the page.
- **Promise demos** – `src/scripts/custom/basic-promise-syntax4*.js` refactor the “showCircle” exercise into progressively more modular variants, showcasing different approaches to structuring Promise-based DOM work.
- **D3 attendance visualisations** – Selecting `d3-practice.js` loads `src/modules/d3-practice/mainLogic.js`, which renders bar, pie, and line charts using the `d3` dependency and randomly generated attendance data.

## Useful Paths

- `src/htmls/main.html` – Loads `dist/app.js`, which bootstraps the selector UI. Open this file in a browser (via a static server for best results) after running Webpack.
- `src/htmls/index.html` – Lightweight page that directly references `dist/scripts6-self-executing-with-utility-with-style.bundle.js` for a minimal dropdown-only experience.
- `src/scripts/custom/` – Promise and chart demos that will appear in the selector once compiled.
- `src/modules/v1/` – Utilities originally shared with the vanilla playground (counter utility, element adder, Promise helpers, logger, etc.).
- `src/modules/d3-practice/` – Button, chart, data, and style helpers consumed by the D3 example.

## Adding a New Demo

1. Create your script under `src/scripts/custom/YourDemo.js`.
2. Re-run (or let watch mode rebuild) so Webpack emits `dist/custom/YourDemo.js`.
3. Append the filename to the `scriptNames` array in `src/modules/v1/globalConstants.js`—the selector will now offer it automatically.

## Tips

- The dropdown expects modules to live under `dist/custom/`. Keep your source files inside `src/scripts/custom/` to maintain that mapping.
- The Promise demos manipulate the DOM directly—clear the console to follow the logging when experimenting.
- The D3 charts rely on randomised data; click “Reload” (rendered by `buttonsUtil.js`) to regenerate attendance sets.
- If you update CommonJS modules under `src/modules/`, remember that Webpack caches outputs. Watch mode covers this automatically; otherwise re-run the build.


