import express from "express";
import { RootRouterV1 } from "./routes/index.js";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
dotenv.config();

const app = express();

try {
  await mongoose.connect(process.env.MONGODB);
  console.log("Connected to MongoDB");
} catch (error) {
  console.error("Failed to connect to MongoDB", error);
  process.exit(1);
}

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

app.use("/", RootRouterV1);

app.listen(process.env.PORT, () => {
  console.log(`Server is running at http://localhost:${process.env.PORT}`);
});
