# Unit Testing Playground

A repository of small, focused projects to explore unit testing, API/data utilities, and creative coding in JavaScript and TypeScript.  
Each subfolder is self-contained with its own dependencies and documentation.

---

## Project Directory

**Unit & Application Testing:**

- [`example-base-01`](./example-base-01/) — **Jest Core Demos**  
  Core Jest features:  
  - Basic to async tests  
  - Setup/teardown  
  - Custom matchers  
  Great for learning fundamental unit testing in isolation.

- [`example-base-02`](./example-base-02/) — **DOM Testing Playground**  
  Focused tests with [@testing-library/dom](https://testing-library.com/docs/dom-testing-library/intro/):  
  - Vanilla DOM manipulation & interaction  
  - Accessible queries, simulated user events  
  No framework required.

- [`example-base-03`](./example-base-03/) — **Testing with Nock**  
  Integration-style tests using [nock](https://github.com/nock/nock) for HTTP endpoint mocking:  
  - Fake responses, error states, request verification  
  - Useful for robust API client test logic

- [`example-base-04`](./example-base-04/) — **Vitest and Test Utilities**  
  Explore [Vitest](https://vitest.dev/) in TypeScript and vanilla setups:  
  - Compare Jest vs. Vitest  
  - Fast runs with modern build tools (e.g., Vite)

- [`example-base-05`](./example-base-05/) — **React + Testing Library**  
  Practical guides for [@testing-library/react](https://testing-library.com/docs/react-testing-library/intro/):  
  - Component interaction/assertion  
  - Async UI updates  
  - Test-driven development (TDD) for UIs

---

**Data & API Utilities:**

- [`example-base-06`](./example-base-06/) — **Axios Study Playground**  
  Hands-on Axios demos (JS, TS, React):  
  - `axios-crash` — Quick CRUD/interceptor/error experiments  
  - `axios-study-in-ts-lib` — Type-safe helpers in Vite+TypeScript  
  - `react-ts-with-axios` — CoinGecko API dashboard in React+TypeScript  
  _See [example-base-06/README.md](./example-base-06/README.md) for sub-project usage._

---

**Creative Coding & Aggregation:**

- [`example-base-07`](./example-base-07/) — **Creative Coding Playground**  
  Node.js playgrounds for graphics and external API aggregation:  
  - `word-meaning` — Minimal Express proxy and normalizer for [dictionaryapi.dev](https://dictionaryapi.dev/); gives compact, consistent JSON for word lookups.  
  - `three-js-demo-with-node-js` — Simple HTTP server to serve small demos (three.js, Babylon.js, p5.js, Zdog). Edit `src/server.js` to swap demos.  
  _Setup per demo: see [example-base-07/README.md](./example-base-07/README.md) for details._

---

**JSON/Data Analysis:**

- [`example-base-08`](./example-base-08/) — **JSON Data Analyze**  
  Scripts and tools for transforming and analyzing repeated-structure JSON datasets, especially conversations:
  - Example data in [`json-data-analyze/data/`](./example-base-08/json-data-analyze/data/)
  - Functions for aggregation, normalization, and extracting insights

---

## Getting Started

Each project is independent; see the corresponding subdirectory for setup.

- Install dependencies in the target folder:  
  `npm install`
- Use provided npm scripts to run/dev/test:
  - `npm run dev`
  - `npm start`
  - Other scripts per subproject

**Recommended:** Node.js 18+  
Some projects may have additional dev dependencies or tooling (Vite, nodemon, etc.).

---

## Additional Notes

- Each demo is intentionally isolated (no shared dependencies/configs).
- For further details, see each sub-project’s README.
- Some examples use public-but-rate-limited APIs (e.g., dictionaryapi.dev, coingecko.com, jsonplaceholder.typicode.com).

---
