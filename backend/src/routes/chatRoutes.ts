import express from "express";
import { 
  handleChat, 
  getConversations,              // ✅ NEW
  getConversationMessages,         // ✅ NEW
  deleteConversationController
} from "../controllers/chatController";
import { authMiddleware } from "../Middleware/authMiddleware";

const router = express.Router();

// Existing endpoint - POST new message
router.post("/", authMiddleware, handleChat);

// ✅ NEW: GET all conversations for user
router.get("/conversations", authMiddleware, getConversations);

// ✅ NEW: GET messages from specific conversation
router.get("/conversations/:conversationId", authMiddleware, getConversationMessages);

// ✅ NEW: DELETE conversation
router.delete("/conversations/:conversationId", authMiddleware, deleteConversationController);

export default router;