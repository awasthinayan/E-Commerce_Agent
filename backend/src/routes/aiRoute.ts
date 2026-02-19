import { Router } from "express";
import { researchProduct } from "../controllers/aiController";

const router = Router();

router.post("/research", researchProduct);

export default router;
