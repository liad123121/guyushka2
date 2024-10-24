import express from "express";
import cors from "cors";
import "express-async-errors";
import { mongo_connect } from "./utils/mongo";
import { stepsRouter } from "./routes/steps";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/steps", stepsRouter);

const start = async () => {
  await mongo_connect();

  app.listen(4000, () => {
    console.log("Server is running on port 4000");
  });
};

start();
