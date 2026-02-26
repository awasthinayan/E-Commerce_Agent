import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    preferences: {
      kpis: [{ type: String }],          // GMV, CAC, LTV
      marketplaces: [{ type: String }], // Amazon, Flipkart
      categories: [{ type: String }]    // Electronics, Fashion
    }
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
