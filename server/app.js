import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import db from "./database/db.js";
import apiRouter from "./routes/api.route.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", apiRouter);
app.get("/", (_req, res) => {
  res.send("API is running");
});

process.on("SIGINT", async () => {
  await db.$disconnect();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  await db.$disconnect();
  process.exit(0);
});

app.listen(PORT, (err) => {
  if (err) return console.error(err);
  console.log(`Server started listening at port ${PORT}`);
});
