# JavaScript Vitest Practice

A practical JavaScript project for learning **Vitest** from basic to advanced testing concepts.

## Requirements

- Node.js 18+
- npm

## Setup

```bash
npm install
```

## Run tests

```bash
npm test
```

Run once:

```bash
npm run test:run
```

Watch mode:

```bash
npm run test:watch
```

Coverage:

```bash
npm run coverage
```

## Topics Covered

1. Basic assertions
2. `describe` and `it`
3. `beforeEach` / `afterEach`
4. Testing arrays and objects
5. Testing exceptions
6. Testing async functions
7. Testing promises
8. Parameterized tests
9. Module mocking
10. Function mocking with `vi.fn`
11. Spying with `vi.spyOn`
12. Fake timers
13. API/service mocking
14. Test coverage
15. Class testing

## Project Structure

```text
javascript-vitest-practice/
├── src/
│   ├── calculator.js
│   ├── userService.js
│   ├── api.js
│   ├── notification.js
│   ├── counter.js
│   └── mathUtils.js
├── tests/
│   ├── calculator.test.js
│   ├── userService.test.js
│   ├── api.test.js
│   ├── notification.test.js
│   ├── counter.test.js
│   └── mathUtils.test.js
├── package.json
├── vitest.config.js
└── README.md
```

## Recommended Learning Order

```text
calculator.test.js
       ↓
mathUtils.test.js
       ↓
counter.test.js
       ↓
userService.test.js
       ↓
notification.test.js
       ↓
api.test.js
```
