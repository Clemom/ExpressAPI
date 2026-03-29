import { Request, Response } from "express";
import { registerSchema, loginSchema } from "../schemas/user.schema";
import { userService } from "../services/user.service";
import { generateAccessToken, generateRefreshToken } from "../lib/jwt";
import { prisma } from "../lib/prisma";

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
};

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

  const accessToken = generateAccessToken({
    id: user.id,
    email: user.email,
  });

  const refreshToken = generateRefreshToken({
    id: user.id,
    email: user.email,
  });

  await prisma.refreshToken.create({
    data: {
      token: refreshToken,
      userId: user.id,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
  });

  res.cookie("accessToken", accessToken, cookieOptions);

  res.cookie("refreshToken", refreshToken, {
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

export const logout = async (req: Request, res: Response) => {
  const token = req.cookies.refreshToken;

  if (token) {
    await prisma.refreshToken.deleteMany({
      where: { token },
    });
  }

  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");

  res.status(200).json({ message: "Logged out" });
};
