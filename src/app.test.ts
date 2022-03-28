import request from "supertest";
import "dotenv/config";
import { app } from "./app";

describe("checks endpoint", () => {
  test("check address endpoint", async () => {
    const res = await request(app).get("/address");
    const address = res.body.address;
    expect(address.door).toBeTruthy();
    expect(address.houseNumber).toBeTruthy();
    expect(address.postalCode?.cPostalCode).toBeTruthy();
    expect(address.postalCode?.cTownName).toBeTruthy();
    expect(address.street).toBeTruthy();
  });
  test("checks for error on address endpoint", async () => {
    process.env.MYSQL_ROOT_PASSWORD = "wrong-password";
    const res = await request(app).get("/address");
    expect(res.statusCode).toBe(401);
  });
  test("checks for full identity generator", async () => {
    const res = await request(app).get("/identity");
    const identity = res.body.identity;
    expect(identity.person.fullName).toBeTruthy();
    expect(identity.person.gender).toBeTruthy();
    expect(identity.person.CPR).toBeTruthy();
    expect(identity.person.dateOfBirth).toBeTruthy();
    expect(identity.address).toBeTruthy();
    expect(identity.phoneNumber).toBeTruthy();
  });

  test("check person endpoint", async () => {
    const res = await request(app).get("/person");
    const person = res.body.person;
    expect(person.fullName).toBeTruthy();
    expect(person.gender).toBeTruthy();
  });

  test("check date of birth endpoint", async () => {
    const res = await request(app).get("/person/date");
    const date = res.body.date;
    expect(date).toBeTruthy();
  });

  test("check cpr endpoint", async () => {
    const res = await request(app).get("/person/cpr");
    const cpr = res.body.cpr;
    expect(cpr).toBeTruthy();
  });

  test("check full person endpoint", async () => {
    const res = await request(app).get("/person/full");
    const personData = res.body.personData;
    expect(personData.fullName).toBeTruthy();
    expect(personData.gender).toBeTruthy();
    expect(personData.dateOfBirth).toBeTruthy();
    expect(personData.cpr).toBeTruthy();
  });

  test("check person no cpr endpoint", async () => {
    const res = await request(app).get("/person/no-cpr");
    const personData = res.body.personData;
    expect(personData.fullName).toBeTruthy();
    expect(personData.gender).toBeTruthy();
    expect(personData.dateOfBirth).toBeTruthy();
  });

  test("check person no birth date endpoint", async () => {
    const res = await request(app).get("/person/no-date");
    const personData = res.body.personData;
    expect(personData.fullName).toBeTruthy();
    expect(personData.gender).toBeTruthy();
    expect(personData.cpr).toBeTruthy();
  });

  test("check phone-number single endpoint", async () => {
    const res = await request(app).get("/phone-number");
    const phoneNumberArray = res.body.Number;
    expect(phoneNumberArray).toBeTruthy();
  });

  test("check phone-number multiple endpoint", async () => {
    const total = 5;
    const res = await request(app).get(`/phone-number/${total}`);
    const phoneNumberArray = res.body.Numbers;
    expect(phoneNumberArray).toBeTruthy();
    expect(phoneNumberArray.length).toBe(total);
  });

  test("checks for error on identity endpoint", async () => {
    process.env.MYSQL_ROOT_PASSWORD = "wrong-password";
    const res = await request(app).get("/identity");
    expect(res.statusCode).toBe(401);
  });
});
