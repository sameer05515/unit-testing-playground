import { describe, expect, it } from "vitest";
import { add, subtract, multiply, divide } from "../src/calculator.js";

describe("Calculator", () => {
  it("should add two numbers", () => {
    expect(add(2, 3)).toBe(5);
  });

  it("should subtract two numbers", () => {
    expect(subtract(10, 4)).toBe(6);
  });

  it("should multiply two numbers", () => {
    expect(multiply(4, 5)).toBe(20);
  });

  it("should divide two numbers", () => {
    expect(divide(20, 4)).toBe(5);
  });

  it("should throw error when dividing by zero", () => {
    expect(() => divide(10, 0))
      .toThrow("Cannot divide by zero");
  });
});
