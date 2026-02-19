import Conversation from "../models/Conversation";

export class ConversationRepository {
  async create(data: any) {
    return Conversation.create(data);
  }

  async findById(id: string) {
    return Conversation.findById(id);
  }

  async findByUser(userId: string) {
    return Conversation.find({ userId });
  }
}
