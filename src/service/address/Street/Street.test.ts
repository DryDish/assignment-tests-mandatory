import { streetGenerator } from "./Street";
import { repeatTestCount } from "../../../app.test";

/**
 * Street. A random assortment of alphabetic characters
 */

describe("Gets random street name", () => {
  for (let i = 0; i < repeatTestCount; i++) {
    test("Generate random sequence of string", () => {
      const streetName: string = streetGenerator();
      expect(streetName).toBeTruthy();
    });
    test("generate only alphabetic characters ", () => {
      const streetName: string = streetGenerator();
      const hasNumberRegex = /\d/;
      expect(hasNumberRegex.test(streetName)).toBe(false);
    });
    test("checks if the string is not longer then 25 character", () => {
      const streetName: string = streetGenerator();
      expect(streetName.length < 25).toBe(true);
    });
  }
});
