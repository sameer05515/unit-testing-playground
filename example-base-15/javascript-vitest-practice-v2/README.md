# JavaScript Vitest Practice — V2

Interview-oriented JavaScript + Vitest practice project.

## Setup
```bash
npm install
```

## Run
```bash
npm test
npm run test:run
npm run test:watch
npm run test:ui
npm run coverage
```

## Topics
- Assertions and matchers
- Lifecycle hooks
- Parameterized tests with `it.each`
- Async/await and rejected promises
- `vi.fn()` mocks
- `vi.spyOn()` spies
- `vi.mock()` module mocking
- Fake timers
- Global `fetch` mocking
- Repository/service testing
- Dependency injection
- Custom errors
- Test setup files
- Coverage

## Structure
```text
src/
  api.js
  calculator.js
  counter.js
  dateUtils.js
  errors.js
  logger.js
  mathUtils.js
  notification.js
  orderService.js
  userRepository.js
  userService.js

tests/
  api.test.js
  calculator.test.js
  counter.test.js
  dateUtils.test.js
  logger.test.js
  mathUtils.test.js
  moduleMocking.test.js
  notification.test.js
  orderService.test.js
  setup.js
  userRepository.test.js
  userService.test.js
```
