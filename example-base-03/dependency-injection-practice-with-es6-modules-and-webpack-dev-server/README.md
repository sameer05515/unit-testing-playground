# Dependency Injection Practice with ES6 Modules & Webpack Dev Server

This playground hosts several small experiments that explore dependency injection, DOM utilities, chart rendering and other ES6-module based snippets. `webpack` compiles every script in `src/scripts` into its own bundle, and the UI lets you load each demo on demand.

## Prerequisites
- Node.js 18+ (other recent LTS versions should also work)
- npm 9+

## Install
```powershell
cd D:\GIT\unit-testing-playground\example-base-03\dependency-injection-practice-with-es6-modules-and-webpack-dev-server
npm install
```

## Available scripts
- `npm run start-dev` — launch `webpack-dev-server` on http://localhost:6060 with hot reload, serving files from `public/`.
- `npm run start` — same as `start-dev`, kept for legacy usage.
- `npm run start-my-webpack-to-build` — run `webpack --watch` to continuously rebuild bundles to `dist/` without serving.
- `npm run build` — produce a one-off build in `dist/`.

When the dev server starts it opens `public/index.html`. That page loads `dist/main-v0.0.2-snapshot.js`, which renders a dropdown. Selecting an option loads the matching module bundle from `dist/custom/...` and mounts its UI. Open the browser console to inspect log output for most examples.

## Project layout
- `src/index.js` – renders the module selector that dynamically imports bundles.
- `src/scripts/**` – source files automatically converted into individual bundles by the custom `getJavaScriptFiles` helper in `webpack.config.js`.
- `src/js/lessons/dependency-injection` – simple DI container, logger and user service examples.
- `src/modules/**` & `src/js/utils/**` – shared utilities reused across demos (element creation, styling, logging, etc.).
- `public/` – entry HTML and extra static pages. `public/extra.html` links to demos under `public/extra/`.

## Working with demos
1. Add a new `.js` file under `src/scripts/...`.
2. Optionally wire additional utilities from `src/js` or `src/modules`.
3. Restart (or let) the dev server rebuild. The new bundle appears in the dropdown automatically because `src/js/utils/global/globalConstants.js` enumerates the generated files.

### Exploring dependency injection sample
The DI lesson lives in `src/js/lessons/dependency-injection`. It shows how the lightweight `DIContainer` registers services (`Logger`, `UserService`) and resolves them inside demos. You can import these modules inside any script to experiment with alternative logger implementations or mocked services.

## Troubleshooting
- If the browser keeps old bundles, clear `dist/` and re-run `npm run build`.
- Port clashes on 6060? Override by running `npx webpack serve --port <new-port>`.
- Large bundle lists can slow initial load; trim `SCRIPTS_OPTIONS` in `globalConstants` if needed.

Happy experimenting!