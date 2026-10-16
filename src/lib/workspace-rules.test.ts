import { describe, expect, test } from "bun:test";
import { isEvidenceVisible, isPortfolioEntryVisible } from "./workspace-rules";
describe("Public portfolio privacy", () => {
  test("only explicitly public entries are included", () => {
    expect(isPortfolioEntryVisible("Public")).toBe(true);
    expect(isPortfolioEntryVisible("Private")).toBe(false);
    expect(isPortfolioEntryVisible("Hidden")).toBe(false);
  });
  test("private attachments remain private even when evidence is enabled", () => {
    expect(isEvidenceVisible("Private", true)).toBe(false);
    expect(isEvidenceVisible("Hidden", true)).toBe(false);
    expect(isEvidenceVisible("Public", true)).toBe(true);
    expect(isEvidenceVisible("Public", false)).toBe(false);
  });
});