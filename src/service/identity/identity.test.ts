import { Identity } from "./identity";
import "dotenv/config";

describe("generate all person identity", () => {
  const { MYSQL_ROOT_PASSWORD } = process.env;
  beforeAll(() => {
    process.env.MYSQL_USER = "root";
    process.env.MYSQL_PASSWORD = MYSQL_ROOT_PASSWORD;
  });
  test("check if all identity are being generate correctly", async () => {
    const identity = new Identity();
    await identity.init();
    expect(identity.person?.fullName).toBeTruthy();
    expect(identity.person?.gender).toBeTruthy();
    expect(identity.person?.CPR).toBeTruthy();
    expect(identity.person?.dateOfBirth).toBeTruthy();
    expect(identity.address).toBeTruthy();
    expect(identity.phoneNumber).toBeTruthy();
  });
});
