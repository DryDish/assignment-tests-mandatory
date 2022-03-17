import "dotenv/config";
import express, { Application, Request } from "express";

const app: Application = express();
const port = process.env.APP_PORT || 9000;

app.get("/", (req, res) => {
  res.send("hello world");
});

// Array length: 95
const validPhoneNumberStarters =
    [
      2, 30, 31, 40, 41, 42, 50, 51, 52, 53, 60, 61, 71, 81, 91, 92, 93,
      342, 344, 345, 346, 347, 348, 349, 356, 357, 359, 362, 365, 366, 389, 398,
      431, 441, 462, 466, 468, 472, 474, 476, 478, 485, 486, 488, 489, 493, 494, 495, 496, 498, 499,
      542, 543, 545, 551, 552, 556, 571, 572, 573, 574, 577, 579, 584, 586, 587, 589, 597, 598,
      627, 629, 641, 649, 658, 662, 663, 664, 665, 667, 692, 693, 694, 697,
      771, 772, 782, 783, 785, 786, 788, 789,
      826, 827, 829
    ]
const maxPhoneNumberLength = 8;
function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

function createRandomPhoneNumber() {
  let phoneNumberStarter = validPhoneNumberStarters[getRandomInt(validPhoneNumberStarters.length-1)];
  let phoneNumberArray = [phoneNumberStarter];
  phoneNumberArray = Array.from(phoneNumberArray.toString()).map(Number);
  console.log('initiating phoneNumberArray.length ' + phoneNumberArray.length);
  while (phoneNumberArray.length < maxPhoneNumberLength) {
    phoneNumberArray.push(getRandomInt(9));
  }
  if (phoneNumberArray.length > 8) {
    // One proper error message to top this magnificence
    console.log("______________ ERROR in code ______________");
  }
  return phoneNumberArray.join("");
}

function genNumbers (tot: number) {
  let x = {}
  for (let i = 0; i < tot; i++) {
    let y = createRandomPhoneNumber();
    console.log(i + ". " + y);
    let n: string = "phoneNo"+i;
    // @ts-ignore
    x[n] = y;
  }
  return x;
}


app.get("/phone-number", (req, res) => {
  let x = genNumbers(1);
  // @ts-ignore
    res.send('Random phone Number : ' + x["phoneNo0"]);
})

app.get("/phone-number/:total", (req, res) => {
  let total: number = +req.params.total;
  try{
    let obj: object = genNumbers(total);
    let returnString = ""
    for (let i = 0; i < total; i++) {
      let objKey: string = "phoneNo"+i;
      // @ts-ignore
      let span = `<span>Phone Number ${i+1} : ${obj[objKey]}</span><br>`
      returnString += span;
    }
    res.send(`<h1>Welcome!</h1> <h2>Here are your ${total} random danish phone numbers</h2> <p>${returnString}</p>`);
  } catch (error) {
    res.send("Error message");
  }

})

app.listen(port, () => {
  console.log(`Connected successfully on port ${port}`);
});



/*
344-349 // 344, 345, 346, 347, 348, 349
356-357 // 356, 357
365-366 // 365, 366
485-486 // 485, 486
488-489 // 488, 489
493-496 // 493, 494, 495, 496
498-499 // 498, 499
542-543 // 542, 543
551-552 // 551, 552
571-574 // 571, 572, 573, 574
586-587 // 586, 587
597-598 // 597, 598
662-665 // 662, 663, 664, 665
692-694 // 692, 693
771-772 // 771, 772
782-783 // 782, 783
785-786 // 785, 786
788-789 // 788, 789
826-827 // 826, 827
 */