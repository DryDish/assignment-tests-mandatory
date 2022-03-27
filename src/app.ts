import "dotenv/config";
import express, { Application } from "express";
import { Address } from "./service/address/address";

const app: Application = express();
const port = process.env.APP_PORT || 9000;

app.get("/", (req, res) => {
  res.send("hello world");
});
app.get("/address", async (req, res) => {
  {
    try {
      const address = new Address();
      await address.init();
      res.send({ address: address });
    } catch (err) {
      res.send(err);
    }
  }
});
app.listen(port, () => {
  console.log(`Connected successfully on port ${port}`);
});
