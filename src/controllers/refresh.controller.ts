import { verifyRefreshToken } from "../lib/jwt";
import { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import { cookieOptions } from "../config/cookie";
import { authService } from "../services/auth.service";

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

    const { accessToken, refreshToken } = await authService.rotateRefreshToken(
      token,
      decoded.id,
      decoded.email,
    );

    res.cookie("accessToken", accessToken, cookieOptions);
    res.cookie("refreshToken", refreshToken, cookieOptions);

    res.status(200).json({ message: "Refreshed" });
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
};
