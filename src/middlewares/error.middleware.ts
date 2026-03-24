import { ZodError } from "zod";
import { Request, Response, NextFunction } from "express";
import { Prisma } from "@prisma/client";

export const errorMiddleware = (err: unknown, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ZodError) {
    return res.status(400).json({
      message: "Validation error",
      errors: err.issues,
    });
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2002") {
      return res.status(409).json({
        message: "Email already exists",
      });
    }
  }

  return res.status(500).json({
    message: "Internal server error",
  });
};