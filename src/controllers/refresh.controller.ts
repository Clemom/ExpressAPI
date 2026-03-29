import {
  verifyRefreshToken,
  generateAccessToken,
  generateRefreshToken,
} from "../lib/jwt";
import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

export const refresh = async (req: Request, res: Response) => {
  const token = req.cookies.refreshToken;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = verifyRefreshToken(token);

    const stored = await prisma.refreshToken.findUnique({
      where: { token },
    });

    if (!stored || stored.expiresAt < new Date()) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }

    await prisma.refreshToken.deleteMany({
      where: { token },
    });

    const newAccessToken = generateAccessToken({
      id: decoded.id,
      email: decoded.email,
    });

    const newRefreshToken = generateRefreshToken({
      id: decoded.id,
      email: decoded.email,
    });

    await prisma.refreshToken.create({
      data: {
        token: newRefreshToken,
        userId: decoded.id,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    res.status(200).json({ message: "Refreshed" });
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
};
