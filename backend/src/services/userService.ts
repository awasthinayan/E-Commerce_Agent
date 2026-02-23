import { UserRepository } from "../Queries/userQuery";

export class UserService {
  private userRepo = new UserRepository();

  async createUser(data: any) {
    if (!data) throw new Error("Invalid data");
    console.log(data);
    return this.userRepo.create(data);
  }

  async getUserById(id: string) {
    if (!id) throw new Error("Invalid ID");
    return this.userRepo.findById(id);
  }

  async updatePreferences(id: string, preferences: any) {
    if (!preferences) throw new Error("Invalid preferences");
    return this.userRepo.updatePreferences(id, preferences);
  }

  async getAllUsersService() {
    return this.userRepo.getAllUsers();
  }
}