import "dotenv/config";
import express, { Application, Request } from "express";
//import mysql, { Connection, Query, QueryError } from "mysql2";
//import { getAllPostalCodes } from "./service/PostalCode/PostalCode";
//import { createConnection } from "mysql2";

const app: Application = express();
const port = process.env.APP_PORT || 9000;

app.get("/", (req, res) => {
  res.send("hello world");
});
/*
const connection = createConnection({
  host: "127.0.0.1",
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: "addresses",
});

let x = getAllPostalCodes(connection);
*/
app.listen(port, () => {
  console.log(`Connected successfully on port ${port}`);
});
