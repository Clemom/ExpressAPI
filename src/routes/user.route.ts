import { Router } from "express";
import { getUsers, createUser } from "../controllers/user.controller";
import { asyncHandler } from "../utils/asyncHandler";

const router = Router();

router.get("/users", asyncHandler(getUsers));
router.post("/users", asyncHandler(createUser));

export default router;