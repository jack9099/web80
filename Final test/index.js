import express from "express";
import { RootRouterV1 } from "./src/routes/index.js";
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

const app = express();

// 1 Connect Database
try {
  await mongoose.connect(process.env.MONGODB);
  console.log("Connected to MongoDB");
} catch (error) {
  console.error("Failed to connect to MongoDB", error);
  process.exit(1);
}

// 2 Define middleware
app.use(express.json());

// 3 Define Routes
app.use("/", RootRouterV1);

// 4 Run Server
app.listen(process.env.PORT, () => {
  console.log(`Server is running at http://localhost:${process.env.PORT}`);
});
