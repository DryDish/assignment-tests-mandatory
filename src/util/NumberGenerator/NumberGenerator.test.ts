import { numberGenerator, randomArrayEntry } from "./NumberGenerator";
import { repeatTestCount } from "../testConfig/repeatTestCount";

describe("checks random number generator", () => {
  for (let i = 0; i < repeatTestCount; i++) {
    test("checks if number is between 1-999 (house number)", () => {
      const houseNumber: number = numberGenerator(999);
      expect(houseNumber > 0 && houseNumber < 1000);
    });
    test("check if generate number between 1-99 (floor)", () => {
      const houseNumber: number = numberGenerator(999);
      expect(houseNumber > 0 && houseNumber < 99);
    });
    test("check if generate number between 1-3 ", () => {
      const houseNumber: number = numberGenerator(3);
      expect(houseNumber > 0 && houseNumber <= 3);
    });
    test("Checks that its a number from 1-50", () => {
      const houseNumber: number = numberGenerator(50);
      expect(houseNumber > 0 && houseNumber <= 50);
    });
  }
});
describe("check random entry from array", () => {
  for (let i = 0; i < repeatTestCount; i++) {
    test("checks on array of numbers", () => {
      expect([1, 2, 3, 4, 5]).toContain(randomArrayEntry([1, 2, 3, 4, 5]));
    });
    test("checks on string", () => {
      expect(["a", "b", "c"]).toContain(randomArrayEntry(["a", "b", "c"]));
    });
    test("checks if empty array is given an error", () => {
      expect(randomArrayEntry([])).toBe(undefined);
    });
  }
});
