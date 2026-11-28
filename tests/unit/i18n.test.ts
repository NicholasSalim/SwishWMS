import { describe, it, expect } from "vitest";
import { formatCurrency, formatNumber, formatDate } from "@/lib/i18n";

describe("Indonesian formatting", () => {
  it("formats IDR currency", () => {
    expect(formatCurrency(1500000)).toMatch(/Rp[\s ]1\.500\.000/);
  });

  it("formats Indonesian number", () => {
    expect(formatNumber(1234567.89)).toBe("1.234.567,89");
  });

  it("formats Indonesian date", () => {
    const formatted = formatDate("2026-11-28");
    expect(formatted).toContain("28");
    expect(formatted).toContain("11");
    expect(formatted).toContain("2026");
  });
});
