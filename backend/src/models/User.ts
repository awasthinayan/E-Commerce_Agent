import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String, unique: true },

    preferences: {
      kpis: [{ type: String }],          // GMV, CAC, LTV
      marketplaces: [{ type: String }], // Amazon, Flipkart
      categories: [{ type: String }]    // Electronics, Fashion
    }
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
