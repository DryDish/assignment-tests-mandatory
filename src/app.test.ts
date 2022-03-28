import request from "supertest";
import "dotenv/config";
import { app, server } from "./app";

describe("checks endpoint", () => {
  const { MYSQL_ROOT_PASSWORD } = process.env;
  const superTest = request(app);
  afterAll(() => {
    server.close();
  });
  test("check address endpoint", () => {
    return superTest
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
  test("checks for full identity generator", () => {
    return superTest
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

  test("checks for multiple identity generator", () => {
    return superTest
      .get("/identity/10")
      .expect(200)
      .then((response) => {
        const identities = response.body.identities;
        expect(identities.length).toBe(10);
      });
  });
  test("checks for multiple identity generator", () => {
    return superTest
      .get("/identity/2")
      .expect(200)
      .then((response) => {
        const identities = response.body.identities;
        expect(identities.length).toBe(2);
      });
  });

  test("checks for multiple identity generator", () => {
    return superTest
      .get("/identity/100")
      .expect(200)
      .then((response) => {
        const identities = response.body.identities;
        expect(identities.length).toBe(100);
      });
  });

  test("checks for too big amount 101", () => {
    return superTest
      .get("/identity/101")
      .expect(422)
      .then((response) => {
        expect(response.body.message).toBe(
          "amount 101 has to be number between 2-100"
        );
      });
  });
  test("checks for too small amount 1", () => {
    return superTest
      .get("/identity/1")
      .expect(422)
      .then((response) => {
        expect(response.body.message).toBe(
          "amount 1 has to be number between 2-100"
        );
      });
  });

  test("checks for non number", () => {
    return superTest
      .get("/identity/thisIsNotNumber")
      .expect(422)
      .then((response) => {
        expect(response.body.message).toBe(
          "amount thisIsNotNumber is not a number"
        );
      });
  });

  test("check person endpoint", () => {
    return superTest
      .get("/person")
      .expect(200)
      .then((response) => {
        const person = response.body.person;
        expect(person.fullName).toBeTruthy();
        expect(person.gender).toBeTruthy();
      });
  });

  test("check date of birth endpoint", () => {
    return superTest
      .get("/person/date")
      .expect(200)
      .then((response) => {
        const date = response.body.date;
        expect(date).toBeTruthy();
      });
  });

  test("check cpr endpoint", () => {
    return superTest
      .get("/person/cpr")
      .expect(200)
      .then((response) => {
        const cpr = response.body.cpr;
        expect(cpr).toBeTruthy();
      });
  });

  test("check full person endpoint", () => {
    return superTest
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

  test("check person no cpr endpoint", () => {
    return superTest
      .get("/person/no-cpr")
      .expect(200)
      .then((response) => {
        const personData = response.body.personData;
        expect(personData.fullName).toBeTruthy();
        expect(personData.gender).toBeTruthy();
        expect(personData.dateOfBirth).toBeTruthy();
      });
  });

  test("check person no birth date endpoint", () => {
    return superTest
      .get("/person/no-date")
      .expect(200)
      .then((response) => {
        const personData = response.body.personData;
        expect(personData.fullName).toBeTruthy();
        expect(personData.gender).toBeTruthy();
        expect(personData.CPR).toBeTruthy();
      });
  });

  test("check phone-number single endpoint", () => {
    return request(app)
      .get("/phone-number")
      .expect(200)
      .then((response) => {
        const phoneNumberArray = response.body.Number;
        expect(phoneNumberArray).toBeTruthy();
      });
  });

  test("check phone-number multiple endpoint", () => {
    const total = 5;
    return request(app)
      .get(`/phone-number/${total}`)
      .expect(200)
      .then((response) => {
        const phoneNumberArray = response.body.Numbers;
        expect(phoneNumberArray).toBeTruthy();
        expect(phoneNumberArray.length).toBe(total);
      });
  });
  test("check error code for wrong total number", () => {
    return request(app)
      .get("/phone-number/this_is_not_number")
      .expect(422)
      .then((response) => {
        expect(response.body.message).toBe("Error generating phone number");
      });
  });

  describe("checks endpoint for bad connection", () => {
    beforeEach(() => {
      process.env.MYSQL_ROOT_PASSWORD = "wrong-code";
    });
    afterEach(() => {
      process.env.MYSQL_ROOT_PASSWORD = MYSQL_ROOT_PASSWORD;
    });
    test("checks identity endpoint", () => {
      return superTest.get("/identity").expect(401);
    });
    test("checks address endpoint", () => {
      return superTest.get("/address").expect(401);
    });
  });
});
