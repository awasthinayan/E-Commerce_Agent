import { ConversationRepository } from "../Queries/conversationQuery";
import { MessageRepository } from "../Queries/chatQuery";
import { AIService } from "./aiServices";

export class ChatService {
  private conversationRepo = new ConversationRepository();
  private messageRepo = new MessageRepository();
  private aiService = new AIService();

  async handleChat(userId: string, query: string, mode: string) {

    const conversation = await this.conversationRepo.create({
      userId,
      title: query.substring(0, 30),
      mode
    });

    await this.messageRepo.create({
      conversationId: conversation._id,
      role: "user",
      content: query
    });

const aiResult = await this.aiService.research(query, mode);

console.log("AI RESULT FULL:", JSON.stringify(aiResult, null, 2));

if (!aiResult?.response) {
  throw new Error("AI returned empty response");
}

await this.messageRepo.create({
  conversationId: conversation._id,
  role: "assistant",
  content: aiResult.response,
  tokens: aiResult.tokens,
  cost: aiResult.cost,
  confidence: aiResult.confidence
});

    return {
      conversationId: conversation._id,
      ...aiResult
    };
  }
}
