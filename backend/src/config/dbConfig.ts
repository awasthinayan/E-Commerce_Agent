import mongoose from "mongoose";
import { ENV } from "../config/envConfig";

export const connectDB = async () => {
  try {
    await mongoose.connect(ENV.MONGO_URI);
    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ DB Connection Failed");
    process.exit(1);
  }
};
