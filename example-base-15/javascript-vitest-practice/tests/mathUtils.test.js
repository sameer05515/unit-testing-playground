import { describe, expect, it } from "vitest";
import { isEven, factorial, filterAdults } from "../src/mathUtils.js";

describe("isEven", () => {
  it.each([
    [2, true],
    [4, true],
    [7, false],
    [11, false]
  ])("isEven(%s) should return %s", (input, expected) => {
    expect(isEven(input)).toBe(expected);
  });
});

describe("factorial", () => {
  it("should calculate factorial", () => {
    expect(factorial(5)).toBe(120);
  });

  it("should return 1 for zero", () => {
    expect(factorial(0)).toBe(1);
  });

  it("should throw for negative numbers", () => {
    expect(() => factorial(-1)).toThrow("non-negative");
  });
});

describe("filterAdults", () => {
  it("should return only adult users", () => {
    const users = [
      { name: "Alice", age: 25 },
      { name: "Bob", age: 16 },
      { name: "Charlie", age: 30 }
    ];

    expect(filterAdults(users)).toEqual([
      { name: "Alice", age: 25 },
      { name: "Charlie", age: 30 }
    ]);
  });
});
