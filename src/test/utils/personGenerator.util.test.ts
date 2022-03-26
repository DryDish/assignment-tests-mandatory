import PersonGenerator, { PersonData } from "../../utils/personGenerator.util";

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
        expect(outputArray[i].fullName.split(' ')).toHaveLength(3);
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
});

/*
  Test cases

  getRandomPerson()
  make sure that gender is only `female` or `male` - with a large sample data.
  make sure that fullName is SOMEHOW made of `firstName` `lastName` separated by space.
  make sure that fullName does not contain numbers. basically make sure that we follow this regex: ^([A-zÀ-úñÑþÞăîĂÎțȚâÂșȘ ]+)$
  
  getRandomCPR()
  make sure that the CPR has the proper length: 10
  make sure that the date has the proper format: ddMMyyRRRR
  make sure it only has numbers from 0 - 9

  getRandomDateOfBirth()
  make sure that the date has the proper length: 10 
  make sure that the date has the proper format: yyyy-MM-dd
  make sure that the date is valid -> split date in 3 and form a date object with it.
  make sure it only has numbers from 0 - 9 and -

  getRandomPersonData()
  make sure that gender is only `female` or `male` - with a large sample data.
  make sure that fullName is SOMEHOW made of `firstName` `lastName` separated by space.
  make sure that fullName does not contain numbers. basically make sure that we follow this regex: ^([A-zÀ-úñÑþÞăîĂÎțȚâÂșȘ ]+)$
  make sure that the CPR has the proper length: 10
  make sure that the date has the proper format: ddMMyyRRRR
  make sure it only has numbers from 0 - 9
  make sure that the date has the proper length: 10 
  make sure that the date has the proper format: yyyy-MM-dd
  make sure that the date is valid -> split date in 3 and form a date object with it.
  make sure that the CPR is odd for male and even for females
  make sure that the CPR corresponds to the date of birth
  make sure it only has numbers from 0 - 9 and -

  */
