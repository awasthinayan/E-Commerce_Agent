import { ConversationRepository } from "../Queries/conversationQuery";
import { MessageRepository } from "../Queries/chatQuery";
import { AIService } from "./aiServices";

export class ChatService {
  private conversationRepo = new ConversationRepository();
  private messageRepo = new MessageRepository();
  private aiService = new AIService();

  async handleChat(
    userId: string,
    query: string,
    mode: string,
    conversationId?: string  // ✅ ADDED: Optional existing conversation
  ) {
    let conversation;

    if (conversationId) {
      // ✅ User is continuing an existing conversation
      conversation = await this.conversationRepo.findById(conversationId);
      
      if (!conversation) {
        throw new Error("Conversation not found");
      }
      
      console.log("✅ Loaded existing conversation:", conversation._id);
    } 
    else {
      // ✅ Create NEW conversation for this chat
      conversation = await this.conversationRepo.create({
        userId,
        title: query.substring(0, 50),  // First 50 chars as title
        mode
      });
      console.log("✅ Created new conversation:", conversation._id)
    }

    // Convert ObjectId to string
    const conversationIdStr = conversation._id.toString();

    // Get conversation history for context
    const previousMessages = await this.messageRepo.findByConversation(
      conversationIdStr
    );

    console.log("✅ Found previous messages:", previousMessages.length);
    // Build context from previous messages
    let conversationContext = "";
    if (previousMessages.length > 0) {
      conversationContext = "Previous conversation history:\n";
      previousMessages.forEach((msg) => {
        conversationContext += `${msg.role}: ${msg.content}\n`;
      });
      conversationContext += "\n---\n\n";
    }

    // Pass conversation history to AI
    const aiResult = await this.aiService.research(
      query,
      mode,
      conversationContext
    );

        console.log("✅ AI returned response");

    console.log("AI RESULT FULL:", JSON.stringify(aiResult, null, 2));

    if (!aiResult?.response) {
      throw new Error("AI returned empty response");
    }

    // Save user message
    await this.messageRepo.create({
      conversationId: conversationIdStr,
      role: "user",
      content: query
    });
      console.log("✅ Saved user message"); 

    // Save AI response
    await this.messageRepo.create({
      conversationId: conversationIdStr,
      role: "assistant",
      content: aiResult.response,
      tokens: aiResult.tokens,
      cost: aiResult.cost,
      confidence: aiResult.confidence
    });
    console.log("✅ Saved AI message"); // ← YOU SHOULD SEE THIS

    console.log("✅ Chat complete for conversation:", conversationIdStr);

    return {
      conversationId: conversationIdStr,
      ...aiResult
    };
  }
}