import express, { Express, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import morgan from "morgan";
import { connect } from "mongoose";
import http from "http";
const { Server } = require("socket.io");
import { v4 as uuidv4 } from "uuid";
import path from "path";

import userRouter from "./routes/user";
import imageUploadRouter from "./routes/imageUpload";
import contactRouter from "./routes/connection";
import { verifyToken } from "./middlewares/verifyToken";

const app: Express = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
const port = process.env.PORT;
const dbUrl = "mongodb://localhost:27017/chatApp";

app.use(morgan("dev"));
app.use(cors());
app.use(imageUploadRouter);
app.use(express.json());
app.use(userRouter);
app.use(verifyToken, contactRouter);
app.use("/assets", express.static(path.join(__dirname, "..", "public")));

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

io.on("connection", (socket: any) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
  socket.on("message", (msg: string, callBack: any) => {
    console.log(callBack);
    console.log("message: " + msg);
    callBack({
      message: `Delivered Successful`,
      id: uuidv4(),
    });
  });
});

server.listen(port, async () => {
  const client = await connect(dbUrl);
  client.connection.on("error", (err) => {
    console.log(err);
  });
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
