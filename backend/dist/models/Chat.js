"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const chatSchema = new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    sessionId: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["user", "assistant"],
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    embeddingId: {
        type: String, // later used for Qdrant vector id
    },
    cost: {
        type: Number,
        default: 0,
    },
    mode: {
        type: String,
        enum: ["quick", "deep"],
        default: "quick",
    },
}, { timestamps: true });
exports.default = mongoose_1.default.model("Chat", chatSchema);
