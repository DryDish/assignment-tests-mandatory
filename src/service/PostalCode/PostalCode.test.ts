import { getAllPostalCodes } from "./PostalCode";
import mysql, { Connection, createPool, Pool } from "mysql2";

describe("checks genrating postal code and city", () => {
  let connection: Pool;
  beforeEach(async () => {
    connection = await createPool({
      host: "localhost",
      user: "root",
      password: "",
      database: "addresses",
    });
    console.log("Connected to database");
  });
  test("gets all available postal code and cities", () => {
    getAllPostalCodes(connection);
    /*    expect(postalCodes.length).toBe(589);*/
  });
});
