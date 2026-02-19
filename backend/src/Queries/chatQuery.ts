import Message from "../models/Chat";

export class MessageRepository {
  async create(data: any) {
    return Message.create(data);
  }

  async findByConversation(conversationId: string) {
    return Message.find({ conversationId }).sort({ createdAt: 1 });
  }
}
