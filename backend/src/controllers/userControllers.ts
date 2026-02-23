import { Request, Response } from "express";
import { UserService } from "../services/userService";

const userService = new UserService();

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, preferences } = req.body;

    if (!name || !email || !preferences) {
      return res.status(400).json({
        message: "Name, email, and preferences are required"
      });
    }

    const user = await userService.createUser(req.body);

    return res.status(201).json(user);

  } catch (error: any) {
    console.error("Create User Error:", error.message);

    return res.status(500).json({
      message: "Something went wrong while creating user"
    });
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    if (!id || Array.isArray(id)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const user = await userService.getUserById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json(user);

  } catch (error: any) {
    console.error("Get User Error:", error.message);

    return res.status(500).json({
      message: "Something went wrong while fetching user"
    });
  }
};

export const updatePreferences = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    if (!id || Array.isArray(id)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    if (!req.body.preferences) {
      return res.status(400).json({
        message: "Preferences are required"
      });
    }

    const user = await userService.updatePreferences(
      id,
      req.body.preferences
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json(user);

  } catch (error: any) {
    console.error("Update Preferences Error:", error.message);

    return res.status(500).json({
      message: "Something went wrong while updating preferences"
    });
  }
};

export const getAllUsersController = async (req: Request, res: Response) => {
  try {
    const users = await userService.getAllUsersService();

    return res.json(users);

  } catch (error: any) {
    console.error("Get All Users Error:", error.message);

    return res.status(500).json({
      message: "Something went wrong while fetching users"
    });
  }
};