import { numberGenerator } from "./NumberGenerator";

describe("checks random number generator", () =>{
  test("checks if number is between 1-999", () => {
    const houseNumber: number = numberGenerator(999)
    expect(houseNumber>0 && houseNumber < 1000)
  })
})