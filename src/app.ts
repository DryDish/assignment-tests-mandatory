import "dotenv/config";
import express, { Application } from "express";
import { Address } from "./service/address/address";
import PhoneNumberGenerator from "./service/phone/PhoneNumberGenerator";
import PersonGenerator from "./service/person/personGenerator.util";
import { Identity } from "./service/identity/identity";

export const app: Application = express();
const port = process.env.APP_PORT || 9000;

const phoneNumberGenerator = new PhoneNumberGenerator();
const personGenerator = new PersonGenerator();

app.get("/identity", async (req, res) => {
  const identity = new Identity();
  try {
    await identity.init();
    res.send({ identity: identity });
  } catch (err) {
    res.sendStatus(401);
  }
});

app.get("/identity/:amount", async (req, res) => {
  const amount = req.params.amount;
  if (/^[0-9]+$/.test(amount)) {
    const amountNumber = parseInt(amount);
    if (amountNumber >= 2 && amountNumber <= 100) {
      const identities: Identity[] = [];
      for (let i = 0; i < amountNumber; i++) {
        const identity = new Identity();
        await identity.init();
        identities.push(identity);
      }
      res.send({ identities });
    } else {
      res
        .status(422)
        .json({ message: `amount ${amount} has to be number between 2-100` });
    }
  } else {
    res.status(422).json({ message: `amount ${amount} is not a number` });
  }
});

app.get("/address", async (req, res) => {
  {
    try {
      const address = new Address();
      await address.init();
      res.send({ address: address });
    } catch (err) {
      res.sendStatus(401);
    }
  }
});

app.get("/phone-number", (req, res) => {
  try {
    let resp = phoneNumberGenerator.genNumbers(1);
    //let returnString = genHtmlPhoneNumberReturnString(array);
    res.send({ Number: resp });
  } catch (error) {
    res.send("Error generating phone number");
  }
});

app.get("/phone-number/:total", (req, res) => {
  let total: number = +req.params.total;
  let resp = phoneNumberGenerator.genNumbers(total);
  res.send({ Numbers: resp });
});

app.get("/person", (req, res) => {
  res.send({ person: personGenerator.getRandomPerson() });
});

app.get("/person/date", (req, res) => {
  res.send({ date: personGenerator.getRandomDateOfBirth() });
});

app.get("/person/cpr", (req, res) => {
  res.send({ cpr: personGenerator.getRandomCPR() });
});

app.get("/person/full", (req, res) => {
  res.send({ personData: personGenerator.getRandomPersonData() });
});

app.get("/person/no-cpr", (req, res) => {
  const personData = personGenerator.getRandomPersonData();
  res.send({
    personData: {
      fullName: personData.fullName,
      gender: personData.gender,
      dateOfBirth: personData.dateOfBirth,
    },
  });
});

app.get("/person/no-date", (req, res) => {
  const personData = personGenerator.getRandomPersonData();
  res.send({
    personData: {
      fullName: personData.fullName,
      gender: personData.gender,
      CPR: personData.CPR,
    },
  });
});

app.listen(port, () => {
  console.log(`Connected successfully on port ${port}`);
});
