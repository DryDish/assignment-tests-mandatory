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

  /**
   * Returns a random Date of Birth between 1/1/1820 and the current date.\
   * \
   * Format: `yyyy-MM-dd`
   * @returns a random Date of Birth.
   */
  public getRandomDateOfBirth(): string {
    const date = this.getRandomDate(new Date(1820, 1, 1), new Date());
    const formattedDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

    return formattedDate;
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

  /**
   * Generates and returns a random date between the `start` and `end` dates.
   * 
   * @param start - start date.
   * @param end - end date.
   * @returns a random date between `start` and `end`.
   */
  private getRandomDate(start: Date, end: Date): Date {
    return new Date(Math.random() * (end.getTime() - start.getTime()) + start.getTime());
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
