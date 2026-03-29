import { generateAccessToken, generateRefreshToken } from "../lib/jwt";
import { prisma } from "../lib/prisma";

export const authService = {
  async generateTokens(userId: string, email: string) {
    const accessToken = generateAccessToken({ id: userId, email });
    const refreshToken = generateRefreshToken({ id: userId, email });

    await prisma.refreshToken.create({
      data: {
        token: refreshToken,
        userId,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    return { accessToken, refreshToken };
  },

  async rotateRefreshToken(oldToken: string, userId: string, email: string) {
    await prisma.refreshToken.deleteMany({
      where: { token: oldToken },
    });

    return this.generateTokens(userId, email);
  },
};