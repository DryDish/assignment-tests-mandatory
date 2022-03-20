import { numberGenerator } from "./NumberGenerator";

describe("checks random number generator", () => {
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
});
