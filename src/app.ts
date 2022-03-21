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

function genRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

function genRandomPhoneNumber() {
  let phoneNumberStarter = validPhoneNumberStarters[genRandomInt(validPhoneNumberStarters.length-1)];
  let phoneNumberArray = [phoneNumberStarter];
  phoneNumberArray = Array.from(phoneNumberArray.toString()).map(Number);
  while (phoneNumberArray.length < maxPhoneNumberLength) {
    phoneNumberArray.push(genRandomInt(9));
  }
  if (phoneNumberArray.length > 8) {
    // One proper error message to top this magnificence
    console.log("______________ ERROR in code ______________");
  }
  return phoneNumberArray.join("");
}

function genNumbers(total: number) {
  let array = [];
  for (let i = 0; i < total; i++) {
    let y: String = genRandomPhoneNumber();
    array.push(y);
  }
  return array;
}

function genHtmlPhoneNumberReturnString(array: Array<String>){
  let returnString = "";
  array.forEach((element, index) => {
    returnString += `<span>Phone number ${index+1} : ${array[index]}</span><br>`
  })
  return returnString;
}


app.get("/phone-number", (req, res) => {
  try {
    let array = genNumbers(1)
    let returnString = genHtmlPhoneNumberReturnString(array);
    res.send(returnString);
  } catch (error) {
    res.send('Error generating phone number');
  }
})

app.get("/phone-number/:total", (req, res) => {
  let total: number = +req.params.total;
  try{
    let array = genNumbers(total);
    let returnString = genHtmlPhoneNumberReturnString(array);
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