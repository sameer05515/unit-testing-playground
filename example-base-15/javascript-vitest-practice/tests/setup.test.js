import { describe, expect, it, beforeAll, afterAll } from "vitest";

describe("Test lifecycle", () => {
  beforeAll(() => {
    // Runs once before all tests
  });

  afterAll(() => {
    // Runs once after all tests
  });

  it("should demonstrate lifecycle hooks", () => {
    expect(true).toBe(true);
  });
});
