import { postalCodeGenerator, PostalCode } from "./PostalCode/PostalCode";
import { apartmentDoorGenerator } from "./Door/Door";
import { houseNumberGenerator } from "./HouseNumber/HouseNumber";
import { streetGenerator } from "./Street/Street";

export class Address {
  door: string | undefined;
  houseNumber: string | undefined;
  postalCode: PostalCode | undefined;
  street: string | undefined;

  public async init() {
    this.door = apartmentDoorGenerator();
    this.houseNumber = houseNumberGenerator();
    this.postalCode = await postalCodeGenerator();
    this.street = streetGenerator();
  }
}
