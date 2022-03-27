import { letterGenerator } from "./LetterGenerator";

describe("generate a single letter", () => {
  for (let i = 0; i < 100; i++) {
    test("checks if a single letter is being generated", () => {
      const houseLetter: string = letterGenerator();
      expect(houseLetter.length === 1).toBe(true);
    });
  }
});
