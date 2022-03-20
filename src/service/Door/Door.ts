import {
  numberGenerator,
  randomArrayEntry,
} from "../../util/NumberGenerator/NumberGenerator";
import { letterGenerator } from "../../util/LetterGenerator/LetterGenerator";

export function getDoorSide(): string {
  return randomArrayEntry(["mf", "tv", "th"]);
}

export function apartmentDoorWithNumberGenerator(): string {
  return letterGenerator() + numberGenerator(999);
}

export function apartmentDoorWithDashGenerator(): string {
  return letterGenerator() + "-" + numberGenerator(999);
}

export function apartmentDoorGenerator(): string {
  return randomArrayEntry([
    getDoorSide(),
    apartmentDoorWithNumberGenerator(),
    apartmentDoorWithDashGenerator(),
  ]);
}
