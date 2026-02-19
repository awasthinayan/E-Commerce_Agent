import { UserRepository } from "../Queries/userQuery";

export class UserService {
  private userRepo = new UserRepository();

  async createUser(data: any) {
    return this.userRepo.create(data);
  }

  async getUserById(id: string) {
    return this.userRepo.findById(id);
  }

  async updatePreferences(id: string, preferences: any) {
    return this.userRepo.updatePreferences(id, preferences);
  }
}
