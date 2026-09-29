import { describe, expect, it } from "vitest";
import { Counter } from "../src/counter.js";

describe("Counter", () => {
  let counter;

  beforeEach(() => {
    counter = new Counter(10);
  });

  it("should initialize with given value", () => {
    expect(counter.getValue()).toBe(10);
  });

  it("should increment", () => {
    expect(counter.increment()).toBe(11);
    expect(counter.getValue()).toBe(11);
  });

  it("should decrement", () => {
    expect(counter.decrement()).toBe(9);
  });

  it("should reset", () => {
    counter.increment();
    counter.reset();

    expect(counter.getValue()).toBe(0);
  });
});
