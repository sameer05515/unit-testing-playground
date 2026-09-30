# JavaScript Arithmetic Library

A simple JavaScript library project containing basic arithmetic operations.

## Features

- `add(a, b)`
- `subtract(a, b)`
- `multiply(a, b)`
- `divide(a, b)`
- Node.js built-in test runner
- ES Modules
- Build script
- npm package structure

## Project Structure

```text
javascript-arithmetic-library/
├── src/
│   └── index.js
├── test/
│   └── index.test.js
├── package.json
└── README.md
```

## Requirements

- Node.js 18+

## Install

```bash
npm install
```

## Run Tests

```bash
npm test
```

## Build

```bash
npm run build
```

The build output is generated in:

```text
dist/index.js
```

## Usage

```javascript
import {
  add,
  subtract,
  multiply,
  divide
} from "javascript-arithmetic-library";

console.log(add(10, 5));       // 15
console.log(subtract(10, 5));  // 5
console.log(multiply(10, 5));   // 50
console.log(divide(10, 5));     // 2
```

## Local Package Testing

After building:

```bash
npm pack
```

This creates an npm package such as:

```text
javascript-arithmetic-library-1.0.0.tgz
```

You can install that package into another local project:

```bash
npm install ../javascript-arithmetic-library/javascript-arithmetic-library-1.0.0.tgz
```

## Future Extensions

This project can later be extended with:

- `power()`
- `modulo()`
- `sqrt()`
- `average()`
- `percentage()`
- TypeScript support
- Jest/Vitest tests
- Rollup/Vite library build
- ESLint
- Prettier
- GitHub Actions
- npm publishing
