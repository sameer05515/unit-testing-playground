# React + Vite + Vitest Counter

A simple React counter application using:

- React
- Vite
- Vitest
- React Testing Library
- jest-dom
- jsdom

## Requirements

- Node.js 20+
- npm 10+

## Install

```bash
npm install
```

## Run application

```bash
npm run dev
```

Open the URL shown by Vite, usually:

```text
http://localhost:5173
```

## Run tests

Watch mode:

```bash
npm test
```

Single test run:

```bash
npm run test:run
```

Vitest UI:

```bash
npm run test:ui
```

Coverage:

```bash
npm run coverage
```

## Test cases

The project includes tests for:

1. Default counter value
2. Custom initial value
3. Increment
4. Decrement
5. Multiple increments
6. Multiple decrements
7. Reset
8. Increment + decrement together

## Project structure

```text
react-vite-vitest-counter/
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
