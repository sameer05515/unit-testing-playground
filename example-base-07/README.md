# Creative Coding Playground

Assortment of small Node-based playgrounds for experimenting with graphics libraries and API aggregation.

## Projects

### `word-meaning`
- Minimal Express service that proxies `dictionaryapi.dev` lookups via `/word/:term`.
- Normalizes definitions, phonetics, and example sentences into a compact JSON structure.
- **Install:** `npm install`
- **Develop:** `npm run dev` (nodemon reloads `src/app.js`)
- Try it with `curl http://localhost:3000/word/example`.

### `three-js-demo-with-node-js`
- Simple HTTP server serving multiple creative coding demos (`three.js`, Babylon.js, p5.js, Zdog) from the `src` directory.
- Toggle which HTML file is served by editing `src/server.js`.
- `src/app.js` and `src/app.1.js` contain three.js scene setup experiments.
- **Install:** `npm install`
- **Run:** `npm start` (nodemon watches `src/server.js`)
- Visit `http://localhost:3000` in a browser once the server starts.

## Notes
- Each project keeps dependencies isolated; install per folder.
- These demos target Node.js 18+. Update the scripts if you want to serve static assets from a proper framework later.

