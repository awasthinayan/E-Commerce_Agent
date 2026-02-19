import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    conversationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Conversation",
      required: true
    },

    role: {
      type: String,
      enum: ["user", "assistant", "system"],
      required: true
    },

    content: {
      type: String,
      required: true
    },

    embeddingId: {
      type: String // for Qdrant vector ID
    },

    tokens: {
      type: Number,
      default: 0
    },

    cost: {
      type: Number,
      default: 0
    },

    confidence: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

export default mongoose.model("Message", messageSchema);
