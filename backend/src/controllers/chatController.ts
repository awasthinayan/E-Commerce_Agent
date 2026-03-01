import { Request, Response } from "express";
import { ChatService } from "../services/chatService";
import { ConversationRepository } from "../Queries/conversationQuery";
import { MessageRepository } from "../Queries/chatQuery";

const chatService = new ChatService();
const messageRepo = new MessageRepository();
const conversationRepo = new ConversationRepository();

export const handleChat = async (req: Request, res: Response) => {
  try {
    const { query, mode, conversationId } = req.body;  // ✅ ADDED: conversationId

    const userId = req.userId;

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

    // ✅ CHANGED: Pass conversationId
    const result = await chatService.handleChat(
      userId,
      query,
      mode || "thorough",
      conversationId  // ✅ Optional: continue existing conversation
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

// ✅ NEW CONTROLLER: Get all conversations for user
export const getConversations = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({
        error: "Unauthorized",
        message: "User ID not found"
      });
    }

    const conversations = await conversationRepo.findAllByUserId(userId);

    res.status(200).json({
      success: true,
      data: conversations
    });
  } catch (error: any) {
    console.error("Error fetching conversations:", error);
    res.status(500).json({
      error: "Failed to fetch conversations",
      message: error.message
    });
  }
};

// ✅ NEW CONTROLLER: Get messages from a conversation
export const getConversationMessages = async (req: Request, res: Response) => {
  try {
    const { conversationId } = req.params;
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({
        error: "Unauthorized",
        message: "User ID not found"
      });
    }

    // Verify conversation belongs to user
    const conversation = await conversationRepo.findById(conversationId as string);

    if (!conversation || conversation.userId.toString() !== userId) {
      return res.status(403).json({
        error: "Forbidden",
        message: "You don't have access to this conversation"
      });
    }

    // Get messages
    const messages = await messageRepo.findByConversation(conversationId as string);

    res.status(200).json({
      success: true,
      data: {
        conversation,
        messages: messages.sort((a: any, b: any) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        )
      }
    });
  } catch (error: any) {
    console.error("Error fetching messages:", error);
    res.status(500).json({
      error: "Failed to fetch messages",
      message: error.message
    });
  }
};

//  ✅ NEW CONTROLLER: Delete conversation

export const deleteConversationController = async (req: Request, res: Response) => {
  try {
    const { conversationId } = req.params;
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({
        error: "Unauthorized",
        message: "User ID not found"
      });
    }

    // Verify conversation belongs to user
    const conversation = await conversationRepo.findById(conversationId as string);

    if (!conversation || conversation.userId.toString() !== userId) {
      return res.status(403).json({
        error: "Forbidden",
        message: "You don't have access to this conversation"
      });
    }

    // Delete conversation
    await conversationRepo.deleteConversation(conversationId as string);

    res.status(200).json({
      success: true,
      message: "Conversation deleted successfully"
    });
  } catch (error: unknown) {
    console.error("Error deleting conversation:", error);
    res.status(500).json({
      error: "Failed to delete conversation",
      message:error
    });
  }
};  