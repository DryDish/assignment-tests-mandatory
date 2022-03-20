import { letterGenerator } from "../../util/LetterGenerator/LetterGenerator";

export function streetGenerator(): string {
  let street = "";
  const randomNr: number = Math.floor(Math.random() * 20) + 1;
  for (let i = 0; i < randomNr; i++ ) {
    street += letterGenerator();
  }
  return street;
}