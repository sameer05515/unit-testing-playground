import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import {
  sendNotification,
  delayedNotification
} from "../src/notification.js";

describe("sendNotification", () => {
  it("should call sender function", () => {
    const sender = vi.fn();

    const result = sendNotification("Hello", sender);

    expect(result).toBe(true);
    expect(sender).toHaveBeenCalledOnce();
    expect(sender).toHaveBeenCalledWith("Hello");
  });

  it("should throw when message is empty", () => {
    const sender = vi.fn();

    expect(() => sendNotification("", sender))
      .toThrow("Message is required");

    expect(sender).not.toHaveBeenCalled();
  });
});

describe("delayedNotification", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should call callback after delay", () => {
    const callback = vi.fn();

    delayedNotification("Hello", callback, 1000);

    expect(callback).not.toHaveBeenCalled();

    vi.advanceTimersByTime(999);
    expect(callback).not.toHaveBeenCalled();

    vi.advanceTimersByTime(1);

    expect(callback).toHaveBeenCalledOnce();
    expect(callback).toHaveBeenCalledWith("Hello");
  });
});
