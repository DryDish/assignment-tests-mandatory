import { letterGenerator } from "../../util/LetterGenerator/LetterGenerator";
import { numberGenerator } from "../../util/NumberGenerator/NumberGenerator";

export function houseNumberGeneratorWithLetter(): string {
  return  numberGenerator(999).toString() + letterGenerator().toUpperCase();
}

export function getHouseNumber(): string {
  if( Math.random() % 2 === 0 ) {
    return numberGenerator(999).toString();
  }
  return houseNumberGeneratorWithLetter();
}