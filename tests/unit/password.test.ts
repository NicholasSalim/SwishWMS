import { describe, it, expect } from "vitest";
import { validatePassword, passwordPolicy } from "@/lib/password";

describe("password policy", () => {
  it("accepts a valid password", () => {
    const result = validatePassword("Secure123!");
    expect(result.valid).toBe(true);
    expect(result.errors).toEqual([]);
  });

  it("rejects too short password", () => {
    const result = validatePassword("Short1!");
    expect(result.valid).toBe(false);
    expect(result.errors).toContain(`Minimal ${passwordPolicy.minLength} karakter`);
  });

  it("rejects missing uppercase", () => {
    const result = validatePassword("secure123!");
    expect(result.valid).toBe(false);
    expect(result.errors).toContain("Harus mengandung huruf besar");
  });

  it("rejects missing digit", () => {
    const result = validatePassword("SecureABC!");
    expect(result.valid).toBe(false);
    expect(result.errors).toContain("Harus mengandung angka");
  });
});
