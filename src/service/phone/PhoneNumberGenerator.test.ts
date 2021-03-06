import PhoneNumberGenerator from "./PhoneNumberGenerator";
import { repeatTestCount } from "../../util/testConfig/repeatTestCount";
const phoneNumberGenerator = new PhoneNumberGenerator();

const genNumberParams = [
  { testTotal: 101, expectedTotal: 100 },
  { testTotal: 100, expectedTotal: 100 },
  { testTotal: 99, expectedTotal: 99 },
  { testTotal: 50, expectedTotal: 50 },
  { testTotal: 1, expectedTotal: 1 },
  { testTotal: 0, expectedTotal: 0 },
  { testTotal: -1, expectedTotal: 0 },
];

describe("generate random phone numbers", () => {
  describe("testing genNumberParams", () => {
    test.each(genNumberParams)(`with params : '%s'`, (params) => {
      const phoneNumberArray: string[] = phoneNumberGenerator.genNumbers(
        params.testTotal
      );
      expect(phoneNumberArray.length).toEqual(params.expectedTotal);
    });
  });
  for (let i = 0; i < repeatTestCount; i++) {
    test("checks if string consists of only numbers and are 8 characters in length", () => {
      const randomNumber: string[] = phoneNumberGenerator.genNumbers(1);
      const onlyNumberRegexWithLengthOfEight = /^[0-9]{8}$/;
      expect(onlyNumberRegexWithLengthOfEight.test(randomNumber[0])).toBe(true);
    });
  }
});
