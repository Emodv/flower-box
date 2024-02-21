// import * as path from "path";
import cors from "cors";
import express from "express";
import deserializeUser from "./middlewares/deserializeUsers";
import cookieParser from "cookie-parser";
import Api1 from "./routes/api";

const app: express.Application = express();

app.use(cookieParser());
app.use(deserializeUser);

const corsOptions = {
  origin: process.env.CLIENT_SERVER,
  credentials: true,
  optionsSuccessStatus: 200
}

//@ts-ignore
app.use(cors(corsOptions));

app.use(express.json());
// app.use("/static", express.static(path.join(__dirname, "public")));

app.use("/v1", Api1);

export = app;
