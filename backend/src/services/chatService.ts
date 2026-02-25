import { ConversationRepository } from "../Queries/conversationQuery";
import { MessageRepository } from "../Queries/chatQuery";
import { AIService } from "./aiServices";

export class ChatService {
  private conversationRepo = new ConversationRepository();
  private messageRepo = new MessageRepository();
  private aiService = new AIService();

  async handleChat(userId: string, query: string, mode: string) {

    // ✅ FIX #1: Get or create conversation
    let conversation = await this.conversationRepo.findByUserId(userId);

    if (!conversation) {
      // Only create new conversation if user has none
      conversation = await this.conversationRepo.create({
        userId,
        title: query.substring(0, 30),
        mode
      });
    }

    // ✅ FIX #2: Convert ObjectId to string
    const conversationId = conversation._id.toString();

    // ✅ FIX #3: Get conversation history for context
    const previousMessages = await this.messageRepo.findByConversation(
      conversationId  // ✅ Now it's a string
    );

    // ✅ FIX #4: Build context from previous messages
    let conversationContext = "";
    if (previousMessages.length > 0) {
      conversationContext = "Previous conversation history:\n";
      previousMessages.forEach((msg) => {
        conversationContext += `${msg.role}: ${msg.content}\n`;
      });
      conversationContext += "\n---\n\n";
    }

    // ✅ FIX #5: Pass conversation history to AI
    const aiResult = await this.aiService.research(
      query,
      mode,
      conversationContext  // Send context!
    );

    console.log("AI RESULT FULL:", JSON.stringify(aiResult, null, 2));

    if (!aiResult?.response) {
      throw new Error("AI returned empty response");
    }

    // Save user message
    await this.messageRepo.create({
      conversationId: conversationId,
      role: "user",
      content: query
    });

    // Save AI response
    await this.messageRepo.create({
      conversationId: conversationId,
      role: "assistant",
      content: aiResult.response,
      tokens: aiResult.tokens,
      cost: aiResult.cost,
      confidence: aiResult.confidence
    });

    return {
      conversationId: conversationId,
      ...aiResult
    };
  }
}