import { persons } from "./person-names.json";

export default class PersonGenerator {
  private peopleList: Array<Person> = persons;

  constructor() {}

  /**
   * Returns a random person object containing:
   * - fullName: string;
   * - gender: string.
   */
  public getRandomPerson(): PersonData {
    const person: Person =
      this.peopleList[this.getRandomNumber(0, this.peopleList.length - 1)];
    return {
      fullName: `${person.name} ${person.surname}`,
      gender: person.gender,
    };
  }

  /**
   * Returns a random CPR number for a random Date of Birth and Gender.
   *
   * @returns a random CPR number
   */
  public getRandomCPR(): string {
    const date = this.getRandomDate(new Date(1923, 1, 1), new Date());
    const randomNumber = this.getRandomNumber(1000, 9999);
    return `${this.formatDate(date, DateFormat.CPR)}${randomNumber}`;
  }

  /**
   * Returns a random Date of Birth between 1/1/1820 and the current date.\
   * \
   * Formats: `yyyy-MM-dd`.
   *
   * @returns a random Date of Birth.
   */
  public getRandomDateOfBirth(): string {
    const date = this.getRandomDate(new Date(1923, 1, 1), new Date());
    return this.formatDate(date, DateFormat.Standard);
  }

  /**
   * Returns a Person Data object containing the full name, gender,
   * date of birth and CPR number.
   *
   * @returns a person data object
   */
  public getRandomPersonData(): PersonFullData {
    // Gathering person name, surname and gender.
    const person: PersonData = this.getRandomPerson();

    // Generating a birth date
    const birthDate = this.getRandomDate(new Date(1923, 1, 1), new Date());
    const birthDateFormatted = this.formatDate(birthDate, DateFormat.Standard);

    // Generating a CPR Number
    let cprEnding = this.getRandomNumber(1000, 9999);
    const cprDateFormatted = this.formatDate(birthDate, DateFormat.CPR);

    // Setting the correct last digit based on gender.
    switch (person.gender) {
      case "female": // Last digit must be even.
        // If it is odd:
        if (!this.isEven(cprEnding)) {
          cprEnding--;
        }
        break;
      case "male": // Last digit must be odd.
        // If it is even:
        if (this.isEven(cprEnding)) {
          cprEnding++;
        }
        break;
    }
    // Assemble the CPR number.
    const cprNumber = `${cprDateFormatted}${cprEnding}`;

    return { ...person, dateOfBirth: birthDateFormatted, CPR: cprNumber };
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
    return new Date(
      Math.random() * (end.getTime() - start.getTime()) + start.getTime()
    );
  }

  /**
   * Formats a date with the given format style and returns the formatted string.
   *
   * @param date - date to format.
   * @param format - specifies which format style to use.
   * @returns a formatted date string.
   */
  private formatDate(date: Date, format: DateFormat): string {
    const month =
      date.getMonth() + 1 < 10
        ? `0${date.getMonth() + 1}`
        : `${date.getMonth() + 1}`;
    const day =
      date.getDate() < 10 ? `0${date.getDate()}` : `${date.getDate()}`;
    const year = date.getFullYear().toString().slice(2);
    switch (format) {
      case DateFormat.Standard:
        return `${date.getFullYear()}-${month}-${day}`;
      case DateFormat.CPR:
        // Adjust the day number to start with a `0` for single digit days
        return `${day}${month}${year}`;
    }
  }

  /**
   * Checks whether the provided number is even or not.
   *
   * @param number - any number
   * @returns true - if number is even; false - if number is odd.
   */
  private isEven(number: number): boolean {
    return number % 2 === 0;
  }
}

export type Person = {
  name: string;
  surname: string;
  gender: string;
};

export type PersonData = {
  fullName: string;
  gender: string;
};

export type PersonFullData = {
  fullName: string;
  gender: string;
  CPR: string;
  dateOfBirth: string;
};

export enum DateFormat {
  Standard,
  CPR,
}
