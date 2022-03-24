import mysql, {
  Connection,
  createConnection,
  Pool,
  QueryError,
  RowDataPacket,
} from "mysql2";

export function getAllPostalCodes(connection: Connection) {
  connection.query("SELECT * FROM postal_code;", (err, result) => {
    console.log("hello there ");
    if (err) {
      console.log("fuck and then print the error");
      throw err;
    }
    console.log("result: ", result);
  });
}

export class PostalCode {
  townName: string;
  postalCode: string;

  constructor(townName: string, postalCode: string) {
    this.townName = townName;
    this.postalCode = postalCode;
  }
}
