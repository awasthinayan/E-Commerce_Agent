import express from "express";
import {
  registerUser,
  loginUser,
  getCurrentUser,
  changePassword,
  getAllUsersController,
  getUserByIdController,
  updatePreferencesController,
  deleteUserController,
  updateUserController
} from "../controllers/userController";
import { authMiddleware } from "../Middleware/authMiddleware";

const router = express.Router();

// ✅ Public routes (no auth required)
router.post("/register", registerUser);
router.post("/login", loginUser);

// ✅ Protected routes (auth required)
router.get("/me", authMiddleware, getCurrentUser);
router.put("/change-password", authMiddleware, changePassword);

// ✅ Additional routes (no auth required)

router.get("/allUsers", getAllUsersController);
router.get("/user/:id", getUserByIdController);
router.put("/user/:id/preferences", authMiddleware, updatePreferencesController);

router.delete("/user/:id", authMiddleware, deleteUserController);
router.put("/user/:id", authMiddleware, updateUserController);

export default router;