import PersonGenerator from "./personGenerator.util";

describe("Person Generator", () => {
  const testDataAmount = 100;

  for (let j = 1; j < testDataAmount; j++) {
    describe("Method: getRandomPerson()", () => {
      it("should only contain gender 'male' or 'female'", () => {
        // Given
        const personGenerator = new PersonGenerator();

        // When
        const person = personGenerator.getRandomPerson();

        // Then
        expect(person.gender).toMatch(/^(male|female)$/);
      });

      it("should have a `fullName` made of `name` and `surname` separated by space", () => {
        // Given
        const personGenerator = new PersonGenerator();

        // When
        const person = personGenerator.getRandomPerson();

        // Then
        expect(person.fullName.split(" ")).toHaveLength(3);
      });

      it("should have a `fullName` that only contains unicode letters", () => {
        // Given
        const personGenerator = new PersonGenerator();

        // When
        const person = personGenerator.getRandomPerson();

        // Then
        expect(person.fullName).toMatch(/^([ -.\p{L}\p{M}*]+)$/gu);
      });
    });

    describe("Method getRandomCPR()", () => {
      it("should have a length of exactly ten characters", () => {
        // Given
        const personGenerator = new PersonGenerator();

        // When
        const cpr = personGenerator.getRandomCPR();

        // Then
        expect(cpr).toHaveLength(10);
      });

      it("should only contain characters from 0 to 9", () => {
        // Given
        const personGenerator = new PersonGenerator();

        // When
        const cpr = personGenerator.getRandomCPR();

        // Then
        expect(cpr).toMatch(/^[0-9]*$/);
      });

      it("should have the proper format: ddMMyyRRRR", () => {
        // Given
        const personGenerator = new PersonGenerator();

        // When
        const cpr = personGenerator.getRandomCPR();

        // Then
        const testDay = Number(cpr.slice(0, 2));
        const testMonth = Number(cpr.slice(2, 4));
        const testYear = Number(cpr.slice(4, 6));
        const testDate = new Date(testYear, testMonth - 1, testDay);

        expect(testDay).toBe(testDate.getDate());
        expect(testMonth).toBe(testDate.getMonth() + 1);
        expect(testYear).toBe(testDate.getFullYear() % 100);
      });
    });

    describe("Method getRandomDateOfBirth()", () => {
      it("should match the format: yyyy-MM-dd and only contain characters from 0 to 9, and -", () => {
        // Given
        const personGenerator = new PersonGenerator();

        // When
        const date = personGenerator.getRandomDateOfBirth();

        // Then
        expect(date).toMatch(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/);
      });

      it("should have a length of exactly ten characters", () => {
        // Given
        const personGenerator = new PersonGenerator();

        // When
        const date = personGenerator.getRandomDateOfBirth();

        // Then
        expect(date).toHaveLength(10);
      });

      it("should be a valid date", () => {
        // Given
        const personGenerator = new PersonGenerator();

        // When
        const date = personGenerator.getRandomDateOfBirth();

        // Then
        const splitDate = date.split("-");
        const testDay = Number(splitDate[2]);
        const testMonth = Number(splitDate[1]);
        const testYear = Number(splitDate[0]);
        const testDate = new Date(testYear, testMonth - 1, testDay);

        expect(testDay).toBe(testDate.getDate());
        expect(testMonth).toBe(testDate.getMonth() + 1);
        expect(testYear).toBe(testDate.getFullYear());
      });
    });

    describe("Method getRandomPersonData()", () => {
      it("should only contain gender 'male' or 'female'", () => {
        // Given
        const personGenerator = new PersonGenerator();

        // When
        const data = personGenerator.getRandomPersonData();

        // Then
        expect(data.gender).toMatch(/^(male|female)$/);
      });

      it("should have a `fullName` made of `name` and `surname` separated by space", () => {
        // Given
        const personGenerator = new PersonGenerator();

        // When
        const data = personGenerator.getRandomPersonData();

        // Then
        expect(data.fullName.split(" ")).toHaveLength(3);
      });

      it("should have a `fullName` that only contains unicode letters", () => {
        // Given
        const personGenerator = new PersonGenerator();

        // When
        const data = personGenerator.getRandomPersonData();

        // Then
        expect(data.fullName).toMatch(/^([ -.\p{L}\p{M}*]+)$/gu);
      });

      it("should have a CPR with a length of exactly ten characters", () => {
        // Given
        const personGenerator = new PersonGenerator();

        // When
        const data = personGenerator.getRandomPersonData();

        // Then
        expect(data.CPR).toHaveLength(10);
      });

      it("should have a CPR that only contains characters from 0 to 9", () => {
        // Given
        const personGenerator = new PersonGenerator();

        // When
        const data = personGenerator.getRandomPersonData();

        // Then
        expect(data.CPR).toMatch(/^[0-9]*$/);
      });

      it("should have a CPR with the proper format: ddMMyyRRRR", () => {
        // Given
        const personGenerator = new PersonGenerator();

        // When
        const data = personGenerator.getRandomPersonData();

        // Then

        const testDay = Number(data.CPR.slice(0, 2));
        const testMonth = Number(data.CPR.slice(2, 4));
        const testYear = Number(data.CPR.slice(4, 6));
        const testDate = new Date(testYear, testMonth - 1, testDay);

        expect(testDay).toBe(testDate.getDate());
        expect(testMonth).toBe(testDate.getMonth() + 1);
        expect(testYear).toBe(testDate.getFullYear() % 100);
      });

      it("should have a birth date that matches the format: yyyy-MM-dd and only contains characters from 0 to 9, and -", () => {
        // Given
        const personGenerator = new PersonGenerator();

        // When
        const data = personGenerator.getRandomPersonData();

        // Then
        expect(data.dateOfBirth).toMatch(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/);
      });

      it("should have a birth date with the length of exactly ten characters", () => {
        // Given
        const personGenerator = new PersonGenerator();

        // When
        const data = personGenerator.getRandomPersonData();

        // Then
        expect(data.dateOfBirth).toHaveLength(10);
      });

      it("should have a valid birth date", () => {
        // Given
        const personGenerator = new PersonGenerator();

        // When
        const data = personGenerator.getRandomPersonData();

        // Then
        const splitDate = data.dateOfBirth.split("-");
        const testDay = Number(splitDate[2]);
        const testMonth = Number(splitDate[1]);
        const testYear = Number(splitDate[0]);
        const testDate = new Date(testYear, testMonth - 1, testDay);

        expect(testDay).toBe(testDate.getDate());
        expect(testMonth).toBe(testDate.getMonth() + 1);
        expect(testYear).toBe(testDate.getFullYear());
      });

      it("should have a CPR that corresponds to the birth date", () => {
        // Given
        const personGenerator = new PersonGenerator();

        // When
        const data = personGenerator.getRandomPersonData();

        // Then
        const splitDateOfBirth = data.dateOfBirth.split("-");
        const dateOfBirthDay = Number(splitDateOfBirth[2]);
        const dateOfBirthMonth = Number(splitDateOfBirth[1]);
        const dateOfBirthYear = Number(splitDateOfBirth[0]);
        const dateOfBirth = new Date(
          dateOfBirthYear,
          dateOfBirthMonth - 1,
          dateOfBirthDay
        );

        const cprDay = Number(data.CPR.slice(0, 2));
        const cprMonth = Number(data.CPR.slice(2, 4));
        let cprYear = Number(data.CPR.slice(4, 6));
        // Setting the correct full year
        if (cprYear >= 23) {
          cprYear += 1900;
        } else {
          cprYear += 2000;
        }
        const cprDate = new Date(cprYear, cprMonth - 1, cprDay);

        expect(cprDate).toStrictEqual(dateOfBirth);
      });

      it("should have a CPR that matches the gender", () => {
        for (let i = 0; i < testDataAmount; i++) {
          // Given
          const personGenerator = new PersonGenerator();

          // When
          const data = personGenerator.getRandomPersonData();

          // Then
          expect(Boolean(Number(data.CPR) % 2)).toEqual(data.gender === "male");
        }
      });
    });
  }
});
