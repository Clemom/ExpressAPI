import { prisma } from "../lib/prisma";
import { CreateUserInput } from "../types/user.type";

export const userService = {
  getUsers: async () => {
    return prisma.user.findMany();
  },
  createUser: async (data: CreateUserInput) => {
    return prisma.user.create({ data });
  },
};
