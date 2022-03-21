import "dotenv/config";
import express, { Application, Request } from "express";
import PhoneNumberGenerator from "./PhoneNumberGenerator";

const app: Application = express();
const port = process.env.APP_PORT || 9000;
const phoneNumberGenerator = new PhoneNumberGenerator();

app.get("/", (req, res) => {
  res.send("hello world");
});


app.get("/phone-number", (req, res) => {
  try {
    let resp = phoneNumberGenerator.genNumbers(1)
    //let returnString = genHtmlPhoneNumberReturnString(array);
    res.send({Number: resp});
  } catch (error) {
    res.send('Error generating phone number');
  }
})

app.get("/phone-number/:total", (req, res) => {
  let total: number = +req.params.total;
  let resp = phoneNumberGenerator.genNumbers(total);
  res.send({Numbers: resp});

})

app.listen(port, () => {
  console.log(`Connected successfully on port ${port}`);
});



/*
  try{
    let array = genNumbers(total);
    let returnString = genHtmlPhoneNumberReturnString(array);
    res.send(`<h1>Welcome!</h1> <h2>Here are your ${total} random danish phone numbers</h2> <p>${returnString}</p>`);
  } catch (error) {
    res.send("Error message");
  }
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