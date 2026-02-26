import { UserRepository } from "../Queries/userQuery";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class UserService {
  private userRepo = new UserRepository();
  private readonly JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-in-env";
  private readonly JWT_EXPIRY = process.env.JWT_EXPIRY || "7d";
  private readonly SALT_ROUNDS = 10;

  // ✅ NEW: Register user with password hashing
  async registerUser(data: any) {
    if (!data || !data.email || !data.password || !data.name) {
      throw new Error("Name, email, and password are required");
    }

    // Check if email already exists
    const emailExists = await this.userRepo.emailExists(data.email);
    if (emailExists) {
      throw new Error("Email already registered");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(data.password, this.SALT_ROUNDS);

    // Create user with hashed password
    const userData = {
      ...data,
      password: hashedPassword
    };

    const user = await this.userRepo.create(userData);

    // Return user without password
    return this.sanitizeUser(user);
  }

  // ✅ NEW: Login user and return JWT token
  async loginUser(email: string, password: string) {
    if (!email || !password) {
      throw new Error("Email and password are required");
    }

    // Find user by email
    const user = await this.userRepo.findByEmail(email);
    if (!user) {
      throw new Error("Invalid email or password");
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid email or password");
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        name: user.name
      },
      this.JWT_SECRET as string,
      { expiresIn: this.JWT_EXPIRY } as any
    );

    // Return token and user data
    return {
      token,
      user: this.sanitizeUser(user)
    };
  }

  // ✅ NEW: Verify JWT token
  async verifyToken(token: string) {
    try {
      const decoded = jwt.verify(token, this.JWT_SECRET as string) as any;
      return decoded;
    } catch (error) {
      throw new Error("Invalid or expired token");
    }
  }

  // ✅ NEW: Change password
  async changePassword(userId: string, oldPassword: string, newPassword: string) {
    if (!oldPassword || !newPassword) {
      throw new Error("Old and new passwords are required");
    }

    const user = await this.userRepo.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    // Verify old password
    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordValid) {
      throw new Error("Old password is incorrect");
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, this.SALT_ROUNDS);

    // Update password
    return this.userRepo.updateUser(userId, { password: hashedPassword });
  }

  // ✅ Existing: Create user (legacy - use registerUser instead)
  async createUser(data: any) {
    if (!data) throw new Error("Invalid data");
    console.log(data);
    return this.userRepo.create(data);
  }

  // ✅ Existing: Get user by ID
  async getUserById(id: string) {
    if (!id) throw new Error("Invalid ID");
    return this.userRepo.findById(id);
  }

  // ✅ Existing: Update preferences
  async updatePreferences(id: string, preferences: any) {
    if (!preferences) throw new Error("Invalid preferences");
    return this.userRepo.updatePreferences(id, preferences);
  }

  // ✅ Existing: Get all users
  async getAllUsersService() {
    return this.userRepo.getAllUsers();
  }

  // ✅ Helper: Remove password from user object
  private sanitizeUser(user: any) {
    const userObj = user.toObject ? user.toObject() : user;
    delete userObj.password;
    return userObj;
  }

  // Update user (legacy - use updateUser instead)
  async updateUserService(id: string, data: any) {
    return this.userRepo.updateUser(id, data);
  }

  // Delete user (legacy - use deleteUser instead)
  async deleteUserService(id: string) {
    return this.userRepo.deleteUser(id);
  }
}

