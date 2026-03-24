import { Request, Response } from "express";
import { registerSchema, loginSchema } from "../schemas/user.schema";
import { userService } from "../services/user.service";


export const register = async (req: Request, res: Response) => {
  const data = registerSchema.parse(req.body);

  const user = await userService.createUser(data);
  const { password, ...safeUser } = user;

  res.status(201).json(safeUser);
};

export const login = async (req: Request, res: Response) => {
  const data = loginSchema.parse(req.body);

  const user = await userService.loginUser(data);

  res.status(200).json(user);
}