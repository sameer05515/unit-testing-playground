import test from "node:test";
import assert from "node:assert/strict";

import {
  add,
  subtract,
  multiply,
  divide
} from "../src/index.js";

test("add()", () => {
  assert.equal(add(10, 5), 15);
});

test("subtract()", () => {
  assert.equal(subtract(10, 5), 5);
});

test("multiply()", () => {
  assert.equal(multiply(10, 5), 50);
});

test("divide()", () => {
  assert.equal(divide(10, 5), 2);
});

test("divide() should throw when divisor is zero", () => {
  assert.throws(
    () => divide(10, 0),
    /Cannot divide by zero/
  );
});
