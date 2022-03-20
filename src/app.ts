import "dotenv/config";
import express, { Application, Request } from "express";

import PersonGenerator from "./utils/personGenerator.util";

const app: Application = express();
const port = process.env.APP_PORT || 9000;

const personGenerator = new PersonGenerator();

app.get("/", (req, res) => {
  res.send("hello world");
});

app.get('/person', (req, res) => {
  res.send({person:  personGenerator.getRandomPerson()});
});

app.listen(port, () => {
  console.log(`Connected successfully on port ${port}`);
});
