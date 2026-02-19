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
      enum: ["quick", "deep"],
      default: "quick"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Conversation", conversationSchema);
