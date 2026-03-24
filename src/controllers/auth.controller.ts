import { Request, Response } from "express";
import { registerSchema } from "../schemas/user.schema";
import { userService } from "../services/user.service";


export const register = async (req: Request, res: Response) => {
  const data = registerSchema.parse(req.body);

  const user = await userService.createUser(data);
  const { password, ...safeUser } = user;

  res.status(201).json(safeUser);
};