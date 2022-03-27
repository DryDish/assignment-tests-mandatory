import {
  getAllPostalCodes,
  postalCodeGenerator,
  PostalCode,
} from "./PostalCode";
import "dotenv/config";
import { allPostalCode } from "../../../mocks/PostalCode/AllPostalCode";
import { repeatTestCount } from "../../../util/testConfig/repeatTestCount";

describe("checks genrating postal code and city", () => {
  const { MYSQL_ROOT_PASSWORD } = process.env;
  beforeAll(() => {
    process.env.MYSQL_USER = "root";
    process.env.MYSQL_PASSWORD = MYSQL_ROOT_PASSWORD;
  });
  test("gets all available postal code and cities", async () => {
    const rows = await getAllPostalCodes();
    expect(rows.length).toBe(589);
  });
  test("get single postal code and city", async () => {
    for (let i = 0; i < repeatTestCount; i++) {
      const postalCode: PostalCode = await postalCodeGenerator();
      expect(allPostalCode).toEqual(expect.arrayContaining([postalCode]));
    }
  }, 5000);
  test("checks contracture for postal code", () => {
    const postalCode: PostalCode = new PostalCode("copenhagen", "1234");
    expect(postalCode.cPostalCode).toBe("1234");
    expect(postalCode.cTownName).toBe("copenhagen");
  });
});
