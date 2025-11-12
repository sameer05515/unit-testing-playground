# Dependency Injection Practice with ES Modules

This sandbox collects a handful of ES module experiments that explore dependency injection, modular utilities, and lightweight local serving. Everything under `src/` is plain JavaScript—no bundlers required—so you can focus on wiring modules together and iterating from the browser.

## What You’ll Find
- `js/lessons/dependency-injection/` showcases a simple DI container, plus `Logger` and `UserService` implementations you can compose in the browser console or other modules.
- `js/utils/` contains reusable helpers (element creation, logging styles, counters, promises) that demonstrate how to keep side-effectful code isolated behind small modules.
- `htmls/` includes worked examples that import the modules directly in `<script type="module">`, making it easy to experiment with dependency injection patterns in different contexts.
- `start-server.js` illustrates how to launch `http-server` programmatically—handy when pairing with tools like `nodemon`.

## Prerequisites
- Node.js ≥ 18 (for the npm scripts and dev tools).
- npm ≥ 9.

Install dependencies (BrowserSync, http-server, nodemon, d3):
```bash
npm install
```

## Project Structure
```
src/
  index.html                     # Entry point linking to example pages
  htmls/                         # Standalone HTML demos (import ES modules directly)
  js/
    lessons/dependency-injection/
      DIContainer.js             # Minimal service registry
      Logger.js                  # Console logger abstraction
      UserService.js             # Example consumer that depends on Logger
    utils/                       # Miscellaneous utilities used by the demos
  start-server.js                # Node script that spawns http-server
```

## Ways to Run the Examples

| Scenario | Command | Notes |
| --- | --- | --- |
| Quick static server (no install) | `npx http-server src -p 6060` | Fast way to browse the `htmls/` demos. |
| npm script equivalent | `npm start` | Runs the same `http-server src -p 6060`. |
| Auto-restart server on file changes | `npm run start-with-nodemon` | Uses `nodemon` to rerun `start-server.js` when anything in `src/` changes. |
| Live reload in the browser | `npm run serve` | Starts BrowserSync and proxies `localhost:6060`. Run `npm start` (or `start-with-nodemon`) in another terminal first so BrowserSync has something to proxy. |

### Optional: Dedicated http-server script
If you prefer the exact command without nodemon or BrowserSync:
```bash
npm run start-http-server
```

## Suggested Learning Path
- Open `src/htmls/example-1.html` in the browser to inspect how multiple modules are composed.
- Explore the dependency injection lesson by importing the modules in DevTools:
  ```js
  import DIContainer from './js/lessons/dependency-injection/DIContainer.js';
  import Logger from './js/lessons/dependency-injection/Logger.js';
  import UserService from './js/lessons/dependency-injection/UserService.js';

  const container = new DIContainer();
  container.register('logger', new Logger());
  container.register('userService', new UserService(container.get('logger')));

  container.get('userService').getUser();
  ```
- Tinker with other utilities under `js/utils/` by wiring them into the HTML demos or your own modules.

## Troubleshooting Tips
- **Port in use**: Change the port, e.g. `npx http-server src -p 7070`.
- **BrowserSync shows a blank page**: Ensure the underlying `http-server` is running on `localhost:6060`.
- **ES module import errors**: Always load files via a local server; opening HTML pages directly from the filesystem prevents module loading due to browser security rules.

Have fun experimenting with DI patterns and modular browser code! Once you’re comfortable, try swapping implementations inside the container (e.g., mock loggers) or expanding the examples with your own services.