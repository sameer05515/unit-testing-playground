## Overview

Sample jQuery + TypeScript project bundled with Webpack. The code in `src/` renders a simple greeting, wires a button click, and calls a JSON endpoint to display the response inside the page.

## Backend Dependency

This frontend expects a Spring Boot API exposed by the companion project located at:

- `D:\GIT\java-playground\logic-implementation-and-testing\api`

Start that project first (e.g. `./mvnw spring-boot:run`) so the AJAX calls in `apiService.ts` succeed.

## Prerequisites

- Node.js 18+ (installs `npm`)
- Java 17+ (to run the Spring Boot API)

## Getting Started

1. Install dependencies once:
   ```powershell
   npm install
   ```
2. Start the Spring Boot backend (see project above).
3. Launch the dev server with live reload:
   ```powershell
   npm run start
   ```
   A browser window should open automatically on `http://localhost:8080/` (Webpack dev server default).
4. For a one-off production build:
   ```powershell
   npm run build
   ```
   Bundled assets land in `dist/`.

## NPM Scripts

- `npm run start` – Webpack dev server with hot reload and auto-open.
- `npm run start-dev` – Same as above but without `--open`.
- `npm run start-my-webpack-to-build` – Watches and rebuilds using the explicit config.
- `npm run build` – Generates a production bundle once.

## Project Layout

- `public/index.html` – Base HTML page loading the Webpack bundle.
- `src/scripts/main.ts` – Entry point registered in Webpack; bootstraps jQuery code.
- `src/scripts/custom/` – Additional sample TypeScript modules.
- `src/utils/services/` – Thin wrappers for DOM updates, URL resolution, and API calls.
- `src/styles/` – Global CSS imported into the bundle.
- `webpack.config.js` – Webpack configuration for TS + CSS bundling.

## Troubleshooting

- Seeing 404s on AJAX calls? Confirm the Spring Boot API is running and the URL built in `urlService.ts` points to the correct host/port.
- Dev server doesn’t open a browser? Manually visit `http://localhost:8080/` or ensure no other process occupies the port.
- TypeScript compile errors on import paths usually mean `tsconfig.json` excludes the file—verify it lives under `src/`.