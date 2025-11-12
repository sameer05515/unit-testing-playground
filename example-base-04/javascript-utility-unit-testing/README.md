# JavaScript Utility Unit Testing

This example project explores patterns for unit testing small utility modules in JavaScript. The `text-indentation` feature demonstrates how to validate indentation rules and build an in-memory tree representation from an indented text outline.

## Project Structure

- `src/text-indentation`: core parsing and validation utilities together with ad-hoc assertion scripts.
- `src/test`: assorted scratch files that illustrate other unit-testing exercises.
- `buildTree.md`: problem statement and notes for the text-indentation exercise.

## Getting Started

1. Install dependencies (if any are added later):\
   `npm install`
2. Run the sample scripts directly with Node.js, for example:\
   `node src/text-indentation/buildTree.test.js`

The repository currently contains console-based checks instead of a formal test runner. You can adapt them into a framework like Jest or Mocha as a follow-up exercise.

## Next Steps

- Replace the console-based checks with automated unit tests.
- Fix the data flow between `parse-lines` and `validate` so that `buildTree` returns the expected hierarchy.
- Extend validation coverage to support mixed indentation (tabs vs spaces) and richer error reporting.

