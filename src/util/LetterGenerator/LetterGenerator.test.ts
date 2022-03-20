import { letterGenerator } from "./LetterGenerator";

describe("generate a single letter", () => {
  test("checks if a single letter is being generated", ()=> {
    const houseLetter: string = letterGenerator()
    expect(houseLetter.length === 1).toBe(true)
  })
})