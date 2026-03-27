import { Request, Response } from "express";
import { registerSchema, loginSchema } from "../schemas/user.schema";
import { userService } from "../services/user.service";
import { generateAccessToken } from "../lib/jwt";

export const me = async (req: Request, res: Response) => {
  const userId = req.user!.id;

  const user = await userService.getUserById(userId);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const { password, ...safeUser } = user;

  res.json(safeUser);
};

export const register = async (req: Request, res: Response) => {
  const data = registerSchema.parse(req.body);

  const user = await userService.createUser(data);
  const { password, ...safeUser } = user;

  res.status(201).json(safeUser);
};

export const login = async (req: Request, res: Response) => {
  const data = loginSchema.parse(req.body);

  const user = await userService.loginUser(data);

  const token = generateAccessToken({
    id: user.id,
    email: user.email,
  });

  res.cookie("accessToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });

  res.status(200).json({
    id: user.id,
    email: user.email,
  });
};
