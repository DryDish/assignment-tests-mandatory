import {
  houseNumberGenerator,
  houseNumberGeneratorWithLetter,
} from "./HouseNumber";

/**
 * requirement:
 *Number. A number from 1 to 999
 * optionally followed by an uppercase letter (e.g., 43B)
 */
describe("checks is house number is being generated currectly", () => {
  for (let i = 0; i < 100; i++) {
    test("generated house number with Uppercase letter", () => {
      const houseNumber: string = houseNumberGeneratorWithLetter();
      expect(/[A-Z ]/.test(houseNumber.charAt(houseNumber.length - 1))).toBe(
        true
      );
    });
    test("check random full number generated with a letter or a space", () => {
      const houseNumber: string = houseNumberGenerator();
      expect(/[A-Z ]/.test(houseNumber.charAt(houseNumber.length - 1))).toBe(
        true
      );
    });
  }
});
