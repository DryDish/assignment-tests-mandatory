import PersonGenerator, {
  PersonData,
  PersonFullData,
} from "../../utils/personGenerator.util";

describe("Person Generator", () => {
  const testDataAmount = 100;

  describe("Method: getRandomPerson()", () => {
    it("should only contain gender 'male' or 'female'", () => {
      // Given
      const personGenerator = new PersonGenerator();
      const outputArray: Array<PersonData> = [];

      // When
      for (let i = 0; i < testDataAmount; i++) {
        outputArray.push(personGenerator.getRandomPerson());
      }

      // Then
      for (let i = 0; i < testDataAmount; i++) {
        expect(outputArray[i].gender).toMatch(/^(male|female)$/);
      }
    });

    it("should have a `fullName` made of `name` and `surname` separated by space", () => {
      // Given
      const personGenerator = new PersonGenerator();
      const outputArray: Array<PersonData> = [];

      // When
      for (let i = 0; i < testDataAmount; i++) {
        outputArray.push(personGenerator.getRandomPerson());
      }

      // Then
      for (let i = 0; i < testDataAmount; i++) {
        expect(outputArray[i].fullName.split(" ")).toHaveLength(3);
      }
    });

    it("should have a `fullName` that only contains unicode letters", () => {
      // Given
      const personGenerator = new PersonGenerator();
      const outputArray: Array<PersonData> = [];

      // When
      for (let i = 0; i < testDataAmount; i++) {
        outputArray.push(personGenerator.getRandomPerson());
      }

      // Then
      for (let i = 0; i < testDataAmount; i++) {
        expect(outputArray[i].fullName).toMatch(/^([ -.\p{L}\p{M}*]+)$/gu);
      }
    });
  });

  describe("Method getRandomCPR()", () => {
    it("should have a length of exactly ten characters", () => {
      // Given
      const personGenerator = new PersonGenerator();
      const outputArray: Array<String> = [];

      // When
      for (let i = 0; i < testDataAmount; i++) {
        outputArray.push(personGenerator.getRandomCPR());
      }

      // Then
      for (let i = 0; i < testDataAmount; i++) {
        expect(outputArray[i]).toHaveLength(10);
      }
    });

    it("should only contain characters from 0 to 9", () => {
      // Given
      const personGenerator = new PersonGenerator();
      const outputArray: Array<String> = [];

      // When
      for (let i = 0; i < testDataAmount; i++) {
        outputArray.push(personGenerator.getRandomCPR());
      }

      // Then
      for (let i = 0; i < testDataAmount; i++) {
        expect(outputArray[i]).toMatch(/^[0-9]*$/);
      }
    });

    it("should have the proper format: ddMMyyRRRR", () => {
      // Given
      const personGenerator = new PersonGenerator();
      const outputArray: Array<String> = [];

      // When
      for (let i = 0; i < testDataAmount; i++) {
        outputArray.push(personGenerator.getRandomCPR());
      }

      // Then
      for (let i = 0; i < testDataAmount; i++) {
        const testDay = Number(outputArray[i].slice(0, 2));
        const testMonth = Number(outputArray[i].slice(2, 4));
        const testYear = Number(outputArray[i].slice(4, 6));
        const testDate = new Date(testYear, testMonth - 1, testDay);

        expect(testDay).toBe(testDate.getDate());
        expect(testMonth).toBe(testDate.getMonth() + 1);
        expect(testYear).toBe(testDate.getFullYear() % 100);
      }
    });
  });

  describe("Method getRandomDateOfBirth()", () => {
    it("should match the format: yyyy-MM-dd and only contain characters from 0 to 9, and -", () => {
      // Given
      const personGenerator = new PersonGenerator();
      const outputArray: Array<String> = [];

      // When
      for (let i = 0; i < testDataAmount; i++) {
        outputArray.push(personGenerator.getRandomDateOfBirth());
      }

      // Then
      for (let i = 0; i < testDataAmount; i++) {
        expect(outputArray[i]).toMatch(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/);
      }
    });

    it("should have a length of exactly ten characters", () => {
      // Given
      const personGenerator = new PersonGenerator();
      const outputArray: Array<String> = [];

      // When
      for (let i = 0; i < testDataAmount; i++) {
        outputArray.push(personGenerator.getRandomDateOfBirth());
      }

      // Then
      for (let i = 0; i < testDataAmount; i++) {
        expect(outputArray[i]).toHaveLength(10);
      }
    });

    it("should be a valid date", () => {
      // Given
      const personGenerator = new PersonGenerator();
      const outputArray: Array<String> = [];

      // When
      for (let i = 0; i < testDataAmount; i++) {
        outputArray.push(personGenerator.getRandomDateOfBirth());
      }

      // Then
      for (let i = 0; i < testDataAmount; i++) {
        const splitDate = outputArray[i].split("-");
        const testDay = Number(splitDate[2]);
        const testMonth = Number(splitDate[1]);
        const testYear = Number(splitDate[0]);
        const testDate = new Date(testYear, testMonth - 1, testDay);

        expect(testDay).toBe(testDate.getDate());
        expect(testMonth).toBe(testDate.getMonth() + 1);
        expect(testYear).toBe(testDate.getFullYear());
      }
    });
  });

  describe("Method getRandomPersonData()", () => {
    it("should only contain gender 'male' or 'female'", () => {
      // Given
      const personGenerator = new PersonGenerator();
      const outputArray: Array<PersonFullData> = [];

      // When
      for (let i = 0; i < testDataAmount; i++) {
        outputArray.push(personGenerator.getRandomPersonData());
      }

      // Then
      for (let i = 0; i < testDataAmount; i++) {
        expect(outputArray[i].gender).toMatch(/^(male|female)$/);
      }
    });

    it("should have a `fullName` made of `name` and `surname` separated by space", () => {
      // Given
      const personGenerator = new PersonGenerator();
      const outputArray: Array<PersonFullData> = [];

      // When
      for (let i = 0; i < testDataAmount; i++) {
        outputArray.push(personGenerator.getRandomPersonData());
      }

      // Then
      for (let i = 0; i < testDataAmount; i++) {
        expect(outputArray[i].fullName.split(" ")).toHaveLength(3);
      }
    });

    it("should have a `fullName` that only contains unicode letters", () => {
      // Given
      const personGenerator = new PersonGenerator();
      const outputArray: Array<PersonFullData> = [];

      // When
      for (let i = 0; i < testDataAmount; i++) {
        outputArray.push(personGenerator.getRandomPersonData());
      }

      // Then
      for (let i = 0; i < testDataAmount; i++) {
        expect(outputArray[i].fullName).toMatch(/^([ -.\p{L}\p{M}*]+)$/gu);
      }
    });

    it("should have a CPR with a length of exactly ten characters", () => {
      // Given
      const personGenerator = new PersonGenerator();
      const outputArray: Array<PersonFullData> = [];

      // When
      for (let i = 0; i < testDataAmount; i++) {
        outputArray.push(personGenerator.getRandomPersonData());
      }

      // Then
      for (let i = 0; i < testDataAmount; i++) {
        expect(outputArray[i].CPR).toHaveLength(10);
      }
    });

    it("should have a CPR that only contains characters from 0 to 9", () => {
      // Given
      const personGenerator = new PersonGenerator();
      const outputArray: Array<PersonFullData> = [];

      // When
      for (let i = 0; i < testDataAmount; i++) {
        outputArray.push(personGenerator.getRandomPersonData());
      }

      // Then
      for (let i = 0; i < testDataAmount; i++) {
        expect(outputArray[i].CPR).toMatch(/^[0-9]*$/);
      }
    });

    it("should have a CPR with the proper format: ddMMyyRRRR", () => {
      // Given
      const personGenerator = new PersonGenerator();
      const outputArray: Array<PersonFullData> = [];

      // When
      for (let i = 0; i < testDataAmount; i++) {
        outputArray.push(personGenerator.getRandomPersonData());
      }

      // Then
      for (let i = 0; i < testDataAmount; i++) {
        const testDay = Number(outputArray[i].CPR.slice(0, 2));
        const testMonth = Number(outputArray[i].CPR.slice(2, 4));
        const testYear = Number(outputArray[i].CPR.slice(4, 6));
        const testDate = new Date(testYear, testMonth - 1, testDay);

        expect(testDay).toBe(testDate.getDate());
        expect(testMonth).toBe(testDate.getMonth() + 1);
        expect(testYear).toBe(testDate.getFullYear() % 100);
      }
    });

    it("should have a birth date that matches the format: yyyy-MM-dd and only contains characters from 0 to 9, and -", () => {
      // Given
      const personGenerator = new PersonGenerator();
      const outputArray: Array<PersonFullData> = [];

      // When
      for (let i = 0; i < testDataAmount; i++) {
        outputArray.push(personGenerator.getRandomPersonData());
      }

      // Then
      for (let i = 0; i < testDataAmount; i++) {
        expect(outputArray[i].dateOfBirth).toMatch(
          /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/
        );
      }
    });

    it("should have a birth date with the length of exactly ten characters", () => {
      // Given
      const personGenerator = new PersonGenerator();
      const outputArray: Array<PersonFullData> = [];

      // When
      for (let i = 0; i < testDataAmount; i++) {
        outputArray.push(personGenerator.getRandomPersonData());
      }

      // Then
      for (let i = 0; i < testDataAmount; i++) {
        expect(outputArray[i].dateOfBirth).toHaveLength(10);
      }
    });

    it("should have a valid birth date", () => {
      // Given
      const personGenerator = new PersonGenerator();
      const outputArray: Array<PersonFullData> = [];

      // When
      for (let i = 0; i < testDataAmount; i++) {
        outputArray.push(personGenerator.getRandomPersonData());
      }

      // Then
      for (let i = 0; i < testDataAmount; i++) {
        const splitDate = outputArray[i].dateOfBirth.split("-");
        const testDay = Number(splitDate[2]);
        const testMonth = Number(splitDate[1]);
        const testYear = Number(splitDate[0]);
        const testDate = new Date(testYear, testMonth - 1, testDay);

        expect(testDay).toBe(testDate.getDate());
        expect(testMonth).toBe(testDate.getMonth() + 1);
        expect(testYear).toBe(testDate.getFullYear());
      }
    });

    it("should have a CPR that corresponds to the birth date", () => {
      // Given
      const personGenerator = new PersonGenerator();
      const outputArray: Array<PersonFullData> = [];

      // When
      for (let i = 0; i < testDataAmount; i++) {
        outputArray.push(personGenerator.getRandomPersonData());
      }

      // Then
      for (let i = 0; i < testDataAmount; i++) {
        const splitDateOfBirth = outputArray[i].dateOfBirth.split("-");
        const dateOfBirthDay = Number(splitDateOfBirth[2]);
        const dateOfBirthMonth = Number(splitDateOfBirth[1]);
        const dateOfBirthYear = Number(splitDateOfBirth[0]);
        const dateOfBirth = new Date(
          dateOfBirthYear,
          dateOfBirthMonth - 1,
          dateOfBirthDay
        );

        const cprDay = Number(outputArray[i].CPR.slice(0, 2));
        const cprMonth = Number(outputArray[i].CPR.slice(2, 4));
        let cprYear = Number(outputArray[i].CPR.slice(4, 6));
        // Setting the correct full year
        if (cprYear >= 23) {
            cprYear += 1900;
        } else {
            cprYear += 2000;
        }
        const cprDate = new Date(cprYear, cprMonth - 1, cprDay);

        expect(cprDate).toStrictEqual(dateOfBirth);
      }
    });

    it("should have a birth date with the length of exactly ten characters", () => {
      // Given
      const personGenerator = new PersonGenerator();
      const outputArray: Array<PersonFullData> = [];
      const genders: Array<string> = ['female', 'male'];

      // When
      for (let i = 0; i < testDataAmount; i++) {
        outputArray.push(personGenerator.getRandomPersonData());
      }

      // Then
      for (let i = 0; i < testDataAmount; i++) {
        const cprLastDigit = Number(outputArray[i].CPR[outputArray[i].CPR.length - 1]);

        expect(outputArray[i].gender).toEqual(genders[cprLastDigit % 2]);
      }
    });
  });
});
