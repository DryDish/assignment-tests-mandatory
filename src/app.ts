import "dotenv/config";
import express, { Application } from "express";

const app: Application = express();
const port = process.env.APP_PORT || 9000;

app.get("/", (req, res) => {
  res.send("hello world");
});
app.listen(port, () => {
  console.log(`Connected successfully on port ${port}`);
});
