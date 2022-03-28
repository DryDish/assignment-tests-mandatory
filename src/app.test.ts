import request from "supertest";
import "dotenv/config";
import { app } from "./app";

describe("checks endpoint", () => {
  const { MYSQL_ROOT_PASSWORD } = process.env;
  beforeEach(() => {
    process.env.MYSQL_ROOT_PASSWORD = MYSQL_ROOT_PASSWORD;
  });
  test("check address endpoint", async () => {
    await request(app)
      .get("/address")
      .expect(200)
      .then((response) => {
        const address = response.body.address;
        expect(address.door).toBeTruthy();
        expect(address.houseNumber).toBeTruthy();
        expect(address.postalCode?.cPostalCode).toBeTruthy();
        expect(address.postalCode?.cTownName).toBeTruthy();
        expect(address.street).toBeTruthy();
      });
  });

  test("checks for error on address endpoint", async () => {
    process.env.MYSQL_ROOT_PASSWORD = "wrong-password";
    await request(app)
      .get("/address")
      .expect(401)
      .then((response) => {
        expect(response.statusCode).toBe(401);
      });
  });
  test("checks for full identity generator", async () => {
    await request(app)
      .get("/identity")
      .expect(200)
      .then((response) => {
        const identity = response.body.identity;
        expect(identity.person.fullName).toBeTruthy();
        expect(identity.person.gender).toBeTruthy();
        expect(identity.person.CPR).toBeTruthy();
        expect(identity.person.dateOfBirth).toBeTruthy();
        expect(identity.address).toBeTruthy();
        expect(identity.phoneNumber).toBeTruthy();
      });
  });

  test("checks for multiple identity generator", async () => {
    await request(app)
      .get("/identity/10")
      .expect(200)
      .then((response) => {
        const identities = response.body.identities;
        console.log(identities);
        expect(identities.length).toBe(10);
      });
  });
  test("checks for multiple identity generator", async () => {
    await request(app)
      .get("/identity/2")
      .expect(200)
      .then((response) => {
        const identities = response.body.identities;
        console.log(identities);
        expect(identities.length).toBe(2);
      });
  });

  test("checks for multiple identity generator", async () => {
    await request(app)
      .get("/identity/100")
      .expect(200)
      .then((response) => {
        const identities = response.body.identities;
        console.log(identities);
        expect(identities.length).toBe(100);
      });
  });

  test("checks for too big amount 101", async () => {
    await request(app)
      .get("/identity/101")
      .expect(422)
      .then((response) => {
        expect(response.body.message).toBe(
          "amount 101 has to be number between 2-100"
        );
      });
  });
  test("checks for too small amount 1", async () => {
    await request(app)
      .get("/identity/1")
      .expect(422)
      .then((response) => {
        expect(response.body.message).toBe(
          "amount 1 has to be number between 2-100"
        );
      });
  });

  test("checks for non number", async () => {
    await request(app)
      .get("/identity/thisIsNotNumber")
      .expect(422)
      .then((response) => {
        expect(response.body.message).toBe(
          "amount thisIsNotNumber is not a number"
        );
      });
  });

  test("check person endpoint", async () => {
    await request(app)
      .get("/person")
      .expect(200)
      .then((response) => {
        const person = response.body.person;
        expect(person.fullName).toBeTruthy();
        expect(person.gender).toBeTruthy();
      });
  });

  test("check date of birth endpoint", async () => {
    await request(app)
      .get("/person/date")
      .expect(200)
      .then((response) => {
        const date = response.body.date;
        expect(date).toBeTruthy();
      });
  });

  test("check cpr endpoint", async () => {
    await request(app)
      .get("/person/cpr")
      .expect(200)
      .then((response) => {
        const cpr = response.body.cpr;
        expect(cpr).toBeTruthy();
      });
  });

  test("check full person endpoint", async () => {
    await request(app)
      .get("/person/full")
      .expect(200)
      .then((response) => {
        const personData = response.body.personData;
        expect(personData.fullName).toBeTruthy();
        expect(personData.gender).toBeTruthy();
        expect(personData.dateOfBirth).toBeTruthy();
        expect(personData.CPR).toBeTruthy();
      });
  });

  test("check person no cpr endpoint", async () => {
    await request(app)
      .get("/person/no-cpr")
      .expect(200)
      .then((response) => {
        const personData = response.body.personData;
        expect(personData.fullName).toBeTruthy();
        expect(personData.gender).toBeTruthy();
        expect(personData.dateOfBirth).toBeTruthy();
      });
  });

  test("check person no birth date endpoint", async () => {
    await request(app)
      .get("/person/no-date")
      .expect(200)
      .then((response) => {
        const personData = response.body.personData;
        expect(personData.fullName).toBeTruthy();
        expect(personData.gender).toBeTruthy();
        expect(personData.CPR).toBeTruthy();
      });
  });

  test("checks for error on identity endpoint", async () => {
    process.env.MYSQL_ROOT_PASSWORD = "wrong-password";
    await request(app).get("/identity").expect(401);
  });
});
