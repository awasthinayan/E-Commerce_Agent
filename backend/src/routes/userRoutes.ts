import express from "express";
import {
  createUser,
  getAllUsersController,
  getUser,
  updatePreferences
} from "../controllers/userControllers";

const router = express.Router();


router.post("/create/user", createUser);
router.get("/allusers", getAllUsersController);
router.get("/users/:id", getUser);
router.put("/users/:id/preferences", updatePreferences);


export default router;
