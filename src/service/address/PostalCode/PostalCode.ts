import { createPool } from "mysql2/promise";
import { randomArrayEntry } from "../../../util/NumberGenerator/NumberGenerator";

const db = () =>
  createPool({
    host: "127.0.0.1",
    port: 3306,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: "addresses",
  });

export async function getAllPostalCodes(): Promise<PostalCode[]> {
  const dbConnection = db();
  const [rows] = await dbConnection.query<[PostalCode[], any]>(
    "SELECT * FROM postal_code;"
  );
  return rows;
}

export class PostalCode {
  cTownName: string;
  cPostalCode: string;

  constructor(townName: string, postalCode: string) {
    this.cTownName = townName;
    this.cPostalCode = postalCode;
  }
}

export async function postalCodeGenerator(): Promise<PostalCode> {
  return randomArrayEntry(await getAllPostalCodes());
}
