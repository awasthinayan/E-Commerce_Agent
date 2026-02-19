import { Request, Response } from "express";
import { AIService } from "../services/aiServices";

const aiService = new AIService();

export const researchProduct = async (req: Request, res: Response) => {
  const { query, mode } = req.body;

  if (!query) {
    return res.status(400).json({ error: "Query is required" });
  }

  const result = await aiService.research(query, mode || "deep");

  res.json(result);
};
