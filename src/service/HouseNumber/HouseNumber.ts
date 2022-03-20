import { letterGenerator } from "../../util/LetterGenerator/LetterGenerator";
import {
  numberGenerator,
  randomArrayEntry,
} from "../../util/NumberGenerator/NumberGenerator";

export function houseNumberGeneratorWithLetter(): string {
  return numberGenerator(999).toString() + letterGenerator().toUpperCase();
}

export function getHouseNumber(): string {
  return randomArrayEntry([
    houseNumberGeneratorWithLetter(),
    numberGenerator(999) + " ",
  ]);
}
