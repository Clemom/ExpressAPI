import { prisma } from "../lib/prisma";

export const userService = {
  getUsers: async () => {
    return prisma.user.findMany();
  },
  createUser: async (data: any) => {
    return prisma.user.create({ data });
  },
};
