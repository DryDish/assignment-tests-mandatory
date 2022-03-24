import { getAllPostalCodes } from "./PostalCode";
import { createConnection } from "mysql2";


describe("checks genrating postal code and city", () => {
  const connection = createConnection({
    host: "localhost",
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: "addresses",
  });
  test("gets all available postal code and cities", () => {
    getAllPostalCodes(connection);
    /*    expect(postalCodes.length).toBe(589);*/
  });
  /*let connection: Pool;
  beforeEach(() => {
    connection = createPool({
      host: "localhost",
      user: "root",
      password: "",
      database: "addresses",
    });
    console.log("Connected to database");
  });*/
  
});
