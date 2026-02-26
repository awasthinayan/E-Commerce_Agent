import User from "../models/User";

export class UserRepository {
  
  // ✅ Create user with password
  async create(data: any) {
    return User.create(data);
  }

  // ✅ Find user by ID
  async findById(id: string) {
    return User.findById(id);
  }

  // ✅ Find user by email (for login)
  async findByEmail(email: string) {
    return User.findOne({ email });
  }

  // ✅ Update user preferences
  async updatePreferences(id: string, preferences: any) {
    return User.findByIdAndUpdate(
      id,
      { preferences },
      { new: true, runValidators: true }
    );
  }

  // ✅ Get all users
  async getAllUsers() {
    return User.find({});
  }

  // ✅ Update user (for password updates, etc.)
  async updateUser(id: string, data: any) {
    return User.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  }

  // ✅ Delete user
  async deleteUser(id: string) {
    return User.findByIdAndDelete(id);
  }

  // ✅ Check if email exists
  async emailExists(email: string) {
    const user = await User.findOne({ email });
    return !!user;
  }
}