# Multiplication App (AngularJS)

Small AngularJS directive demo that renders a multiplication table with configurable dimensions and exposes each cell's product to transcluded content.

## Getting Started

- Install dependencies once with `npm install`.
- Build Tailwind-powered styles with `npm run build:css`.
- Launch a local static server with `npm start` (serves `public/` after building CSS).
- For a live-reload workflow, run `npm run dev` to watch Tailwind and serve simultaneously.
- Open the printed URL (defaults to `http://127.0.0.1:8080`) in your browser.
- Use the inputs on the page to change the number of rows and columns in real time.

## Project Structure

- `public/index.html` renders the demo UI, including Tailwind-styled controls.
- `public/multiplication-app.js` defines the directives that build the table and calculate each cell's value.
- `public/multiplication-table-tpl.html` is the table layout template, looping over generated rows and columns.
- `public/multiplication-app.css` is the generated Tailwind output (do not edit directly).
- `styles/tailwind.css` contains Tailwind directives and component styles.
- `tailwind.config.js` / `postcss.config.js` configure the Tailwind build.
- `package.json` provides dev server, Tailwind build, formatting, and testing scripts.

## Formatting

- Run `npm run format` to beautify HTML, CSS, JS, Markdown, and JSON files via Prettier.

## Testing

- Install dependencies with `npm install` (if you have not already).
- Run `npm test` to execute the Karma + Jasmine unit tests in headless Chrome.
- Tests cover table dimensions, per-cell multiplication, and table regeneration when `x` or `y` change.

## Testing Ideas

Current tests verify:

- Directive renders the correct number of rows and columns for given `x`/`y` values.
- Each `multiplicationCell` computes `x * y` correctly for various indices.
- Changing `x` or `y` after initial render regenerates the table.

Consider expanding coverage to include additional directives, styles, or edge cases as you enhance the example.
