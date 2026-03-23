import { Request, Response } from "express";
import { createUserSchema } from "../schemas/user.schema";
import { userService } from "../services/user.service";

export const getUsers = async (req: Request, res: Response) => {
  const users = await userService.getUsers();
  res.json(users);
};

export const createUser = async (req: Request, res: Response) => {
  const data = createUserSchema.parse(req.body);

  const user = await userService.createUser(data);

  res.status(201).json(user);
};