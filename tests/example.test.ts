import { describe, expect, it } from "vitest";
import { greeting, greetingWithOptions } from "../src/lib";

describe("greeting", () => {
  it("should return greeting message", () => {
    expect(greeting("World")).toBe("Hello, World!");
  });
});

describe("greetingWithOptions", () => {
  it("should return greeting with custom prefix", () => {
    expect(greetingWithOptions("World", { prefix: "Hi" })).toBe("Hi, World!");
  });

  it("should return greeting with custom suffix", () => {
    expect(greetingWithOptions("World", { suffix: "?" })).toBe("Hello, World?");
  });
});
