import express from "express";
import {
  createUser,
  getUser,
  updatePreferences
} from "../controllers/userControllers";

const router = express.Router();

router.post("/", createUser);
router.get("/:id", getUser);
router.put("/:id/preferences", updatePreferences);

export default router;
