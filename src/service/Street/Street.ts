import { letterGenerator } from "../../util/LetterGenerator/LetterGenerator";
import { numberGenerator } from "../../util/NumberGenerator/NumberGenerator";

export function streetGenerator(): string {
  let street = "";
  const randomNr: number = numberGenerator(20);
  for (let i = 0; i < randomNr; i++) {
    street += letterGenerator();
  }
  return street;
}
