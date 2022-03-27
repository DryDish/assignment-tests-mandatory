
export default class PhoneNumberGenerator {

  private validPhoneNumberStarters: Array<number> =
    [
      2, 30, 31, 40, 41, 42, 50, 51, 52, 53, 60, 61, 71, 81, 91, 92, 93,
      342, 344, 345, 346, 347, 348, 349, 356, 357, 359, 362, 365, 366, 389, 398,
      431, 441, 462, 466, 468, 472, 474, 476, 478, 485, 486, 488, 489, 493, 494, 495, 496, 498, 499,
      542, 543, 545, 551, 552, 556, 571, 572, 573, 574, 577, 579, 584, 586, 587, 589, 597, 598,
      627, 629, 641, 649, 658, 662, 663, 664, 665, 667, 692, 693, 694, 697,
      771, 772, 782, 783, 785, 786, 788, 789,
      826, 827, 829
    ];

  private maxPhoneNumberLength: number = 8;

  private genRandomInt(max: number) : number {
    return Math.floor(Math.random() * max);
  }

  private genRandomPhoneNumber() : string {
    let phoneNumberStarter = this.validPhoneNumberStarters[this.genRandomInt(this.validPhoneNumberStarters.length-1)];
    let phoneNumberArray = [phoneNumberStarter];
    phoneNumberArray = Array.from(phoneNumberArray.toString()).map(Number);
    while (phoneNumberArray.length < this.maxPhoneNumberLength) {
      phoneNumberArray.push(this.genRandomInt(9));
    }
    /* istanbul ignore next */
    if (phoneNumberArray.length > 8) {
      console.error("phoneNumberArray.length is more than 8");
    }
    return phoneNumberArray.join("");
  }

  public genNumbers(total: number) : Array<string> {
    if (total > 100) {
      total = 100;
    } else if (total < 0) {
      total = 0;
    }
    let array = [];
    for (let i = 0; i < total; i++) {
      let y: string = this.genRandomPhoneNumber();
      array.push(y);
    }
    return array;
  }
}


