export function numberGenerator(maxNumber: number): number {
  return Math.floor(Math.random() * maxNumber) + 1;
}
export function randomArrayEntry<T>(array: T[]): T {
  return array[numberGenerator(array.length - 1)];
}
