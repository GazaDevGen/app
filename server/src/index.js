import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import http from "http";
import mongoose from "mongoose";
import { PORT, DB_URL } from "../config/index.js";
import router from "../router/index.js";
import path from "path";
import { fileURLToPath } from "url";
const app = express();

const server = http.createServer(app);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(
  cors({
    origin: "*",
  })
);
app.use("/images", express.static(path.join(__dirname, "images")));

app.use(express.urlencoded({ extended: true }));
app.use(
  express.json({
    limit: "999999999",
  })
);
// app.use(cookieParser());
app.use("/api", router);

server.listen(PORT, async () => {
  console.log("SERVER IS RUNNING!");

  await mongoose.connect(DB_URL);
  console.log("DB connected");
});
