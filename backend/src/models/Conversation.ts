import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    title: { type: String }, // Auto generated from first query

    mode: {
      type: String,
      enum: ["thorough", "fast"],  // ✅ CHANGED from ["quick", "deep"]
      default: "thorough"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Conversation", conversationSchema);
