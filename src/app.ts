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

app.get('/person/date', (req, res) => {
  res.send({date: personGenerator.getRandomDateOfBirth(false)});
});

app.get('/person/cpr', (req, res) => {
  res.send({cpr: personGenerator.getRandomCPR()});
});

app.listen(port, () => {
  console.log(`Connected successfully on port ${port}`);
});
