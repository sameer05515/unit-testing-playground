# Example Base 03 – Promise Practice Playground

This workspace collects a series of JavaScript, TypeScript, and framework-based mini-projects that explore Promises, dependency injection, charting, and CRUD patterns across different stacks. Use `Reference.md` for deeper study notes; this README gives you the practical map for running each project.

## Prerequisites
- Node.js ≥ 18 and npm ≥ 9 (Angular CLI, Vue CLI, and webpack tooling expect a modern runtime).
- `http-server` (`npx http-server` works without a global install) for the vanilla Promise demos.
- Angular CLI (`npm install -g @angular/cli`) if you want to work on `angular-crud`.

## Getting Started
1. Clone or update this repository and open the `example-base-03` folder.
2. Each project is isolated; `cd` into a folder and run `npm install` the first time.
3. Follow the commands in the table below to start the desired demo or API.

## Project Lineup
| Folder | Stack / Focus | How to Run |
| --- | --- | --- |
| `promise-practice` | Vanilla JS Promise patterns rendered via static HTML | `npx http-server src -p 6060` (or add the script to `package.json`) |
| `promise-practice-in-react` | React 18 SPA showcasing Promise use cases and UI components | `npm install` → `npm start` |
| `nodejs-backend` | Express API exposing employee & student endpoints | `npm install` → `npm start` (nodemon dev) or `npm run prod` |
| `promise-practice-with-commonjs-webpack` | CommonJS modules bundled with webpack, including Promise + D3 examples | `npm install` → `npm start` (webpack watch) then open `dist/main.html` |
| `d3-charts-es6-modules-with-webpack-dev-server` | ES modules + D3 visualisations with webpack dev server | `npm install` → `npm start` (webpack-dev-server) or `npm run start-dev` |
| `dependency-injection-practice-with-es6-modules-and-http-server` | Browser-based DI demos served via `http-server`/`nodemon` | `npm install` → `npm start` (`http-server`), `npm run start-with-nodemon`, or `npm run serve` |
| `dependency-injection-practice-with-es6-modules-and-webpack-dev-server` | DI utilities bundled with webpack, plus Promise use cases | `npm install` → `npm run start-dev` (webpack dev server) |

## Additional Front-End CRUD Starters
- `vue-crud`: Vue 3 + Axios example (`npm install` → `npm run serve`).
- `angular-crud`: Angular 18 CLI project (`npm install` → `npm start` or `ng serve`).
- `jquery-TS-WebPack`: TypeScript + jQuery bundled with webpack (`npm install` → `npm start`).

## Tips & References
- `Reference.md` lists the recommended order for exploring the Promise-focused projects.
- Many folders contain legacy `dist/` artifacts; delete and rebuild (`npm run build`) if you need a clean bundle.
- For webpack-based projects, the dev servers default to port 8080; override via CLI flags if you have conflicts.
- The Express backend listens on `http://localhost:3000` and exposes `/api` and `/students` routes; update CORS or body limits in `src/server.js` as needed.

Happy experimenting!

