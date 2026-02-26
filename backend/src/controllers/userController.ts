import { Request, Response } from "express";
import { UserService } from "../services/userService";

const userService = new UserService();

// ✅ Register endpoint
export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password, preferences } = req.body;

    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({
        error: "Validation Error",
        message: "Name, email, and password are required"
      });
    }

    // Register user
    const user = await userService.registerUser({
      name,
      email,
      password,
      preferences: preferences || {}
    });

    res.status(201).json({
      message: "User registered successfully",
      user
    });
  } catch (error: any) {
    console.error("Register Error:", error.message);
    
    if (error.message.includes("already registered")) {
      return res.status(409).json({
        error: "Conflict",
        message: error.message
      });
    }

    res.status(500).json({
      error: "Registration failed",
      message: error.message
    });
  }
};

// ✅ Login endpoint
export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        error: "Validation Error",
        message: "Email and password are required"
      });
    }

    // Login user
    const result = await userService.loginUser(email, password);

    res.status(200).json({
      message: "Login successful",
      token: result.token,
      user: result.user
    });
  } catch (error: any) {
    console.error("Login Error:", error.message);
    
    res.status(401).json({
      error: "Authentication failed",
      message: error.message
    });
  }
};

// ✅ Get current user (from JWT token)
export const getCurrentUser = async (req: Request, res: Response) => {
  try {
    if (!req.userId) {
      return res.status(401).json({
        error: "Unauthorized",
        message: "No user ID found in token"
      });
    }

    const user = await userService.getUserById(req.userId);
    
    if (!user) {
      return res.status(404).json({
        error: "Not found",
        message: "User not found"
      });
    }

    res.status(200).json({
      message: "User retrieved successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        preferences: user.preferences,
        createdAt: user.createdAt
      }
    });
  } catch (error: any) {
    console.error("Get Current User Error:", error.message);
    
    res.status(500).json({
      error: "Failed to retrieve user",
      message: error.message
    });
  }
};

// ✅ Change password
export const changePassword = async (req: Request, res: Response) => {
  try {
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res.status(400).json({
        error: "Validation Error",
        message: "Old and new passwords are required"
      });
    }

    if (!req.userId) {
      return res.status(401).json({
        error: "Unauthorized",
        message: "No user ID found in token"
      });
    }

    await userService.changePassword(req.userId, oldPassword, newPassword);

    res.status(200).json({
      message: "Password changed successfully"
    });
  } catch (error: any) {
    console.error("Change Password Error:", error.message);
    
    res.status(400).json({
      error: "Password change failed",
      message: error.message
    });
  }
};

export const getAllUsersController = async (req: Request, res: Response) => {
  try {
    const users = await userService.getAllUsersService();

    res.status(200).json({
      message: "Users retrieved successfully",
      users
    });
  } catch (error: any) {
    console.error("Get All Users Error:", error.message);
    
    res.status(500).json({
      error: "Failed to retrieve users",
      message: error.message
    });
  }
};

export const getUserByIdController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        error: "Validation Error",
        message: "ID is required"
      });
    }

    const user = await userService.getUserById(id as string);

    if (!user) {
      return res.status(404).json({
        error: "Not found",
        message: "User not found"
      });
    }

    res.status(200).json({
      message: "User retrieved successfully",
      user
    });
  } catch (error: any) {
    console.error("Get User By ID Error:", error.message);
    
    res.status(500).json({
      error: "Failed to retrieve user",
      message: error.message
    });
  }
};

export const updatePreferencesController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { preferences } = req.body;

    if (!id) {
      return res.status(400).json({
        error: "Validation Error",
        message: "ID is required"
      });
    }

    if (!preferences) {
      return res.status(400).json({
        error: "Validation Error",
        message: "Preferences are required"
      });
    }

    const user = await userService.updatePreferences(id as string, preferences);

    res.status(200).json({
      message: "Preferences updated successfully",
      user
    });
  } catch (error: any) {
    console.error("Update Preferences Error:", error.message);
    
    res.status(500).json({
      error: "Failed to update preferences",
      message: error.message
    });
  }
};

export const deleteUserController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        error: "Validation Error",
        message: "ID is required"
      });
    }

    const user = await userService.deleteUserService(id as string);

    res.status(200).json({
      message: "User deleted successfully",
      user
    });
  } catch (error: any) {
    console.error("Delete User Error:", error.message);
    
    res.status(500).json({
      error: "Failed to delete user",
      message: error.message
    });
  }
};  

export const updateUserController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, email, password, preferences } = req.body;

    if (!id) {
      return res.status(400).json({
        error: "Validation Error",
        message: "ID is required"
      });
    }

    if (!name || !email || !password) {
      return res.status(400).json({
        error: "Validation Error",
        message: "Name, email, and password are required"
      });
    }

    const user = await userService.updateUserService(id as string, {
      name,
      email,
      password,
      preferences: preferences || {}
    });

    res.status(200).json({
      message: "User updated successfully",
      user
    });
  } catch (error: any) {
    console.error("Update User Error:", error.message);
    
    res.status(500).json({
      error: "Failed to update user",
      message: error.message
    });
  }
};