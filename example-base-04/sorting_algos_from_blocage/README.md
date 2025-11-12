# Sorting Algorithms Visualizer

This project is a vanilla JavaScript visualization of classic sorting algorithms. It recreates the original demo from [blocage/sorting_algos](https://github.com/blocage/sorting_algos) with minor adjustments for modern tooling and local development.

## Features

- Interactive controls for algorithm selection, array size, and animation speed.
- Real-time visualization of multiple sorting strategies (bubble, quick, heap, counting, and more).
- Light/dark theme toggle and responsive layout built with Bootstrap.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version 16 or higher recommended)

### Installation

```bash
npm install
```

### Local Development Server

```bash
npm start
```

This command launches an `http-server` instance with caching disabled so you can develop against the vanilla ES modules served directly from this folder. By default the app is available at [http://localhost:4173](http://localhost:4173).

### Other Scripts

```bash
# Serve the app on an alternate port (8080)
npm run serve
```

## Project Structure

- `App.js` – UI logic for generating arrays, invoking algorithms, and animating the progress indicator.
- `Algorithms/` – Individual algorithm implementations exposed through an import map.
- `Visual/` – Theme switching and animation helpers.
- `Misc/` – DOM helpers and prototype extensions used across the app.
- `Styles/` – Light and dark theme CSS as well as shared styling.

## Notes

- The project relies on the `importmap` defined in `index.html`. If you add new modules, update the import map to expose them.
- When serving with another static server, ensure it supports import maps and ES modules.


