import {
  getAllPostalCodes,
  postalCodeGenerator,
  PostalCode,
} from "./PostalCode";
import "dotenv/config";
import { allPostalCode } from "../../../mocks/PostalCode/AllPostalCode";

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
    const postalCode: PostalCode = await postalCodeGenerator();
    expect(allPostalCode).toEqual(expect.arrayContaining([postalCode]));
  });
});
