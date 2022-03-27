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
