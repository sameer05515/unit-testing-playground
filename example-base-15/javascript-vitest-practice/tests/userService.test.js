import { describe, expect, it, vi } from "vitest";
import { getUser, getUserDisplayName } from "../src/userService.js";

describe("getUser", () => {
  it("should return user from API", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        id: 1,
        firstName: "Prem",
        lastName: "Kumar"
      })
    });

    const user = await getUser(1, fetchMock);

    expect(user).toEqual({
      id: 1,
      firstName: "Prem",
      lastName: "Kumar"
    });

    expect(fetchMock).toHaveBeenCalledOnce();
    expect(fetchMock).toHaveBeenCalledWith(
      "https://example.com/users/1"
    );
  });

  it("should throw when API fails", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: false,
      status: 500
    });

    await expect(getUser(1, fetchMock))
      .rejects
      .toThrow("Failed to fetch user: 500");
  });
});

describe("getUserDisplayName", () => {
  it("should return full name", () => {
    expect(
      getUserDisplayName({
        firstName: "Prem",
        lastName: "Kumar"
      })
    ).toBe("Prem Kumar");
  });
});
