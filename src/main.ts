import express, { Express, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import morgan from "morgan";
import userRouter from "./routes/user";
import { connect } from "mongoose";

const app: Express = express();
const port = process.env.PORT;
const dbUrl = "mongodb://localhost:27017/chatApp";

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(userRouter);


app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(port, async () => {
  const client = await connect(dbUrl);
  client.connection.on("error", (err) => {
    console.log(err);
  });
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
