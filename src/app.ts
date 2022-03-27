import "dotenv/config";
import express, { Application, Request } from "express";
import PhoneNumberGenerator from "./PhoneNumberGenerator";

import PersonGenerator from "./utils/personGenerator.util";

const app: Application = express();
const port = process.env.APP_PORT || 9000;
const phoneNumberGenerator = new PhoneNumberGenerator();

const personGenerator = new PersonGenerator();

app.get("/", (req, res) => {
  res.send("hello world");
});


app.get("/phone-number", (req, res) => {
  try {
    let resp = phoneNumberGenerator.genNumbers(1)
    //let returnString = genHtmlPhoneNumberReturnString(array);
    res.send({Number: resp});
  } catch (error) {
    res.send('Error generating phone number');
  }
})

app.get("/phone-number/:total", (req, res) => {
  let total: number = +req.params.total;
  let resp = phoneNumberGenerator.genNumbers(total);
  res.send({Numbers: resp});

})

app.get('/person', (req, res) => {
  res.send({person:  personGenerator.getRandomPerson()});
});

app.get('/person/date', (req, res) => {
  res.send({date: personGenerator.getRandomDateOfBirth()});
});

app.get('/person/cpr', (req, res) => {
  res.send({cpr: personGenerator.getRandomCPR()});
});

app.get('/person/full', (req, res) => {
  res.send({personData: personGenerator.getRandomPersonData()});
});

app.get('/person/no-cpr', (req, res) => {
  const personData = personGenerator.getRandomPersonData();
  res.send({personData: {
    fullName: personData.fullName,
    gender: personData.gender,
    dateOfBirth: personData.dateOfBirth,
  }});
});

app.get('/person/no-date', (req, res) => {
  const personData = personGenerator.getRandomPersonData();
  res.send({personData: {
    fullName: personData.fullName,
    gender: personData.gender,
    CPR: personData.CPR,
  }});
});

app.listen(port, () => {
  console.log(`Connected successfully on port ${port}`);
});
