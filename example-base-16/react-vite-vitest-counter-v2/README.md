# React + Vite + Vitest Counter V2

V2 improves the original project with more realistic testing patterns.

## What's new in V2

- `@testing-library/user-event`
- `beforeEach`
- `it.each()` parameterized tests
- Accessibility-first queries using `getByRole()` and `getByLabelText()`
- `output` element for the current count
- More edge-case tests
- Vitest UI
- Coverage support

## Install

```bash
npm install
```

## Start application

```bash
npm run dev
```

## Run tests

```bash
npm test
```

## Run tests once

```bash
npm run test:run
```

## Run Vitest UI

```bash
npm run test:ui
```

## Generate coverage

```bash
npm run coverage
```

## Test cases

1. Default count
2. Parameterized initial values
3. Increment
4. Decrement
5. Multiple increments
6. Multiple decrements
7. Reset
8. Increment + decrement
9. Return to zero
10. Negative count
11. Accessibility/button assertions

## Project structure

```text
react-vite-vitest-counter-v2/
├── index.html
├── package.json
├── vite.config.js
├── README.md
└── src/
    ├── App.jsx
    ├── index.css
    ├── main.jsx
    ├── components/
    │   ├── Counter.jsx
    │   └── Counter.test.jsx
    └── test/
        └── setup.js
```

