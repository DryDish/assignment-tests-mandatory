import { Address } from "../address/address";
import PersonGenerator, {
  PersonData,
  PersonFullData,
} from "../person/personGenerator.util";
import PhoneNumberGenerator from "../phone/PhoneNumberGenerator";

export class Identity {
  person: PersonFullData | undefined;
  address: Address | undefined;
  phoneNumber: string | undefined;

  public async init() {
    const address = new Address();
    await address.init();
    this.person = new PersonGenerator().getRandomPersonData();
    this.address = address;
    this.phoneNumber = new PhoneNumberGenerator().genNumbers(1)[0];
  }
}
