import { Router } from "express";
import { me } from "../controllers/auth.controller";
import { asyncHandler } from "../utils/asyncHandler";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.get("/me", authMiddleware, asyncHandler(me));

export default router;