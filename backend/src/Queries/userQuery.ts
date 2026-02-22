import User from "../models/User";

export class UserRepository {
  async create(data: any) {
    return User.create(data);
  }

  async findById(id: string) {
    return User.findById(id);
  }

  async updatePreferences(id: string, preferences: any) {
    return User.findByIdAndUpdate(id, { preferences }, { new: true });
  }

  async getAllUsers() {
    return User.find({});
  }
}

