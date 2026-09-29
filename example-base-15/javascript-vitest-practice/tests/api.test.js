import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { fetchUsers } from "../src/api.js";

describe("fetchUsers", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("should return users", async () => {
    fetch.mockResolvedValue({
      ok: true,
      json: async () => [
        { id: 1, name: "Alice" },
        { id: 2, name: "Bob" }
      ]
    });

    const users = await fetchUsers();

    expect(users).toHaveLength(2);
    expect(fetch).toHaveBeenCalledOnce();
  });

  it("should throw when API returns error", async () => {
    fetch.mockResolvedValue({
      ok: false
    });

    await expect(fetchUsers())
      .rejects
      .toThrow("API request failed");
  });
});
