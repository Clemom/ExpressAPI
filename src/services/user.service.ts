import { prisma } from "../lib/prisma";
import { CreateUserInput } from "../types/user.type";
import bcrypt from "bcrypt";

export const userService = {
  getUsers: async () => {
    return prisma.user.findMany();
  },

  createUser: async (data: CreateUserInput) => {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    return prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });
  },
};
