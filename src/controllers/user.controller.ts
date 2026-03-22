import { Request, Response } from "express";
import { userService } from "../services/user.service";

export const getUsers = async (req: Request, res: Response) => {
  const users = await userService.getUsers();
  res.json(users);
};

export const createUser = async (req: Request, res: Response) => {
  const user = await userService.createUser(req.body);
  res.json(user);
};
