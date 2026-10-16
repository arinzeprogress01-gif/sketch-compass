import { expect, test } from "bun:test";
import { cvFilename } from "./cv";
test("PDF filenames are safe and meaningful", () => {
  expect(cvFilename("Progress Arinze")).toBe("Progress-Arinze-CV.pdf");
  expect(cvFilename(" ../ ")).toBe("FolioPro-CV.pdf");
});