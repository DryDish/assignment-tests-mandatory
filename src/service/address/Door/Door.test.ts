import {
  apartmentDoorGenerator,
  apartmentDoorWithDashGenerator,
  apartmentDoorWithNumberGenerator,
  getDoorSide,
} from "./Door";

/**
 * requirement:
 * Door. “th”, “mf”, “tv”, a number from 1 to 50,
 * or alowercase letter optionally followed by a dash,
 * thenfollowed by one to three numeric digits
 * (e.g., c3, d-14)
 * */

describe("checks door generator", () => {
  test("checks if th/mf/tv is being generated", () => {
    const oldApartmentDoorOption = ["th", "mf", "tv"];
    expect(oldApartmentDoorOption.includes(getDoorSide())).toBe(true);
  });
  test("checks if door is a letter with a number", () => {
    const apartmentDoor = apartmentDoorWithNumberGenerator();
    const apartmentDoorNumber = parseInt(apartmentDoor.substring(1));
    expect(/[a-z]/.test(apartmentDoor.charAt(0))).toBe(true);
    expect(apartmentDoorNumber > 0 && apartmentDoorNumber < 1000).toBe(true);
  });
  test("checks if door is a number with a letter with dash", () => {
    const apartmentDoorWithDash = apartmentDoorWithDashGenerator();
    const apartmentDoorNumber = parseInt(apartmentDoorWithDash.substring(2));
    expect(apartmentDoorWithDash.charAt(1) === "-").toBe(true);
    expect(apartmentDoorNumber > 0 && apartmentDoorNumber < 1000).toBe(true);
  });
  test("checks if door is string || number || letter w number || letter w dash and number", () => {
    const apartmentDoor: string = apartmentDoorGenerator();
    expect(
      ["th", "mf", "tv"].includes(apartmentDoor) ||
        !isNaN(parseInt(apartmentDoor)) ||
        (/[a-z]/.test(apartmentDoor.charAt(0)) &&
          !isNaN(parseInt(apartmentDoor.substring(1)))) ||
        (/[a-z]/.test(apartmentDoor.charAt(0)) &&
          apartmentDoor.charAt(1) === "-" &&
          !isNaN(parseInt(apartmentDoor.substring(2))))
    );
  });
});
