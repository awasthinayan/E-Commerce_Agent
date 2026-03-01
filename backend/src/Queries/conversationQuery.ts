import Conversation from "../models/Conversation";

export class ConversationRepository {
  
  async create(data: any) {
    return Conversation.create(data);
  }

  // ✅ NEW METHOD: Find latest conversation by userId
  async findByUserId(userId: string) {
    return Conversation.findOne({ userId }).sort({ createdAt: -1 });
  }

  async findById(id: string) {
    return Conversation.findById(id);
  }

  // Optional: Get all conversations for a user
  async findAllByUserId(userId: string) {
    return Conversation.find({ userId }).sort({ createdAt: -1 });
  }

  async deleteConversation(id: string) {
    return Conversation.deleteOne({ _id: id });
  } 
}

