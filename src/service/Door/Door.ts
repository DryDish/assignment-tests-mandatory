import { numberGenerator } from "../../util/NumberGenerator/NumberGenerator";
import { letterGenerator } from "../../util/LetterGenerator/LetterGenerator";

export function getDoorSide(): string {
  return ["mf", "tv", "th"][numberGenerator(3) - 1];
}

export function apartmentDoorWithNumberGenerator(): string {
  return letterGenerator() + numberGenerator(999);
}

export function apartmentDoorWithDashGenerator(): string {
  return letterGenerator() + "-" + numberGenerator(999);
}

export function apartmentDoorGenerator(): string {
  return [
    getDoorSide(),
    apartmentDoorWithNumberGenerator(),
    apartmentDoorWithDashGenerator(),
  ][numberGenerator(3) - 1];
}
