import { Request, Response } from "express";
import { ChatService } from "../services/chatService";

const chatService = new ChatService();

export const handleChat = async (req: Request, res: Response) => {
  try {
    const { query, mode } = req.body;

    // ✅ Get userId from JWT token (set by authMiddleware)
    const userId = req.userId;

    // Validate input
    if (!query) {
      return res.status(400).json({
        error: "Validation Error",
        message: "Query is required"
      });
    }

    if (!userId) {
      return res.status(401).json({
        error: "Unauthorized",
        message: "User ID not found in token"
      });
    }

    // Process chat
    const result = await chatService.handleChat(
      userId,
      query,
      mode || "thorough"
    );

    res.status(200).json({
      message: "Chat processed successfully",
      ...result
    });
  } catch (error: any) {
    console.error("Chat Error:", error.message);

    res.status(500).json({
      error: "Chat processing failed",
      message: error.message
    });
  }
};