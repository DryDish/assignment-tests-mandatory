import "dotenv/config";
import express, { Application } from "express";
import { Address } from "./service/address/address";

export const app: Application = express();
const port = process.env.APP_PORT;

app.get("/address", async (req, res) => {
  {
    try {
      const address = new Address();
      await address.init();
      res.send({ address: address });
    } catch (err) {
      res.sendStatus(401);
    }
  }
});
app.listen(port, () => {
  console.log(`Connected successfully on port ${port}`);
});
