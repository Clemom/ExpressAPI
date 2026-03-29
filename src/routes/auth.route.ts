import { Router } from "express";
import { register, login, logout } from "../controllers/auth.controller";
import { asyncHandler } from "../utils/asyncHandler";
import { refresh } from "../controllers/refresh.controller";

const router = Router();

router.post("/register", asyncHandler(register));
router.post("/login", asyncHandler(login));
router.post("/refresh", asyncHandler(refresh));
router.post("/logout", asyncHandler(logout));

export default router;