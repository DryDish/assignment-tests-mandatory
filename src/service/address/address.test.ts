import { Address } from "./address";
import "dotenv/config";

describe("checks auto generated address", () => {
  const { MYSQL_ROOT_PASSWORD } = process.env;
  beforeAll(async () => {
    process.env.MYSQL_USER = "root";
    process.env.MYSQL_PASSWORD = MYSQL_ROOT_PASSWORD;
  });
  test("checks if address contain all the expected attributes", async () => {
    const address = new Address();
    await address.init();
    expect(address.door).toBeTruthy();
    expect(address.houseNumber).toBeTruthy();
    expect(address.postalCode?.cPostalCode).toBeTruthy();
    expect(address.postalCode?.cTownName).toBeTruthy();
    expect(address.street).toBeTruthy();
  });
});
