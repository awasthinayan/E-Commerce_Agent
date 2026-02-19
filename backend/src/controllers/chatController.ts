import { Request, Response } from "express";
import { ChatService } from "../services/chatService";

const chatService = new ChatService();

export const handleChat = async (req: Request, res: Response) => {
  const { userId, query, mode } = req.body;

  const result = await chatService.handleChat(userId, query, mode);

  res.json(result);
};
