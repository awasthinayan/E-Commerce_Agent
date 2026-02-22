import express from "express";
import {
  createUser,
  getAllUsersController,
  getUser,
  updatePreferences
} from "../controllers/userControllers";

const router = express.Router();


router.post("/create/user", createUser);
router.get("/user/:id", getUser);
router.put("/:id/preferences", updatePreferences);
router.get("/allUsers", getAllUsersController);


export default router;
