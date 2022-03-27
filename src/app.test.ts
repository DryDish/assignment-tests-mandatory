import { app } from "./app";
import request from "supertest";
import "dotenv/config";

describe("checks endpoint", () => {
  test("check address endpoint", async () => {
    const res = await request(app).get("/address");
    const address = res.body.address;
    expect(address.door).toBeTruthy();
    expect(address.houseNumber).toBeTruthy();
    expect(address.postalCode?.cPostalCode).toBeTruthy();
    expect(address.postalCode?.cTownName).toBeTruthy();
    expect(address.street).toBeTruthy();
  });
  test("checks for error on address endpoint", async () => {
    process.env.MYSQL_ROOT_PASSWORD = "wrong-password";
    const res = await request(app).get("/address");
    expect(res.statusCode).toBe(401);
  });
});

export const repeatTestCount = 10;
