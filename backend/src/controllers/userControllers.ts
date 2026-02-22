import { Request, Response } from "express";
import { UserService } from "../services/userService";

const userService = new UserService();

export const createUser = async (req: Request, res: Response) => {
  const user = await userService.createUser(req.body);
  res.json(user);
};

export const getUser = async (req: Request, res: Response) => {
  const id = req.params.id;

  if (!id || Array.isArray(id)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }

  const user = await userService.getUserById(id);
  res.json(user);
};

export const updatePreferences = async (req: Request, res: Response) => {
  const id = req.params.id;

  if (!id || Array.isArray(id)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }

  const user = await userService.updatePreferences(
    id,
    req.body.preferences
  );

  res.json(user);
};

export const getAllUsersController = async (req: Request, res: Response) => {
  const users = await userService.getAllUsersService();
  res.json(users);
};