import { getHouseNumber, houseNumberGeneratorWithLetter } from "./HouseNumber";

describe("checks is house number is being generated currectly", () => {
  test("generated house number with Uppercase letter", () => {
    const houseNumber: string = houseNumberGeneratorWithLetter()
    expect(/[A-Z ]/.test(houseNumber.charAt(houseNumber.length-1))).toBe(true)
  })
  test("check random full number generated with a letter or a space",()=> {
    const houseNumber: string = getHouseNumber()
    expect(/[A-Z ]/.test(houseNumber.charAt(houseNumber.length-1))).toBe(true)
  })
})