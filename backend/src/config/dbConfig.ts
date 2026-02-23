import mongoose from "mongoose";
import { MONGO_URI } from "./envConfig";

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ DB Connection Failed");
    process.exit(1);
  }
};
