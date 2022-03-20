import { persons } from "./person-names.json";

export default class PersonGenerator {
  private peopleList: Array<Person> = persons;

  constructor() {}

  /**
   * Returns a random person object containing:
   * - name: string;
   * - surname: string;
   * - gender: string.
   */
  public getRandomPerson(): Person {
    return this.peopleList[this.getRandomNumber(0, this.peopleList.length)];
  }

  public getRandomCPR() {
    return;
  }

  public getRandomDateOfBirth() {
    return;
  }

  public getRandomPersonData() {
    return;
  }

  /**
   * Generates and returns a random number between `min` and `max`, inclusive at both `min` and `max`.
   *
   * @param min - minimum value.
   * @param max - maximum value.
   * @returns a random number between `min` and `max`.
   */
  private getRandomNumber(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}

type Person = {
  name: string;
  surname: string;
  gender: string;
};

type PersonData = {
  name: string;
  surname: string;
  gender: string;
  CPR: string;
  dateOfBirth: string;
};
