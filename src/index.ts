import express, { Application } from "express";
import dotenv from "dotenv";
import userRouter from "./users/user.routes";
import blogsRouter from "./blogs/blogs.routers";
import bodyParser from "body-parser";
const app: Application = express();
dotenv.config();

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/user", userRouter);
app.use("/blogs", blogsRouter);

app.listen(process.env.PORT, () =>
  console.log(`The Server Is Running At Port ${process.env.PORT}`)
);
