# My Electron App

Simple Electron starter that opens two windows with static HTML content.

## Prerequisites

- Node.js 18 or later
- npm 9 or later

## Setup

```bash
npm install
```

## Run the App

```bash
npm start
```

This launches Electron with two browser windows loading `src/index.html` and `src/index1.html`.

## Project Structure

- `src/main.js` – Electron main process that constructs the application windows.
- `src/index.html` – First renderer window.
- `src/index1.html` – Second renderer window.
- `assets/prem.png` – Window icon.

## Packaging

This template does not include packaging scripts. If you need installers/bundles, consider adding tooling such as [`electron-builder`](https://www.electron.build/) or [`electron-packager`](https://github.com/electron/electron-packager).

## Recommended Improvements

See the review in `src/main.js` for notes on hardening the file loading paths and window lifecycle management.

