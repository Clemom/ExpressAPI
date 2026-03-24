import { prisma } from "../lib/prisma";
import { CreateUserInput, LoginUserInput } from "../types/user.type";
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

  loginUser: async (data: LoginUserInput) => {
    const user = await prisma.user.findUnique({
      where: { email: data.email },
    });
    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isValid = await bcrypt.compare(data.password, user.password);

    if (!isValid) {
      throw new Error("Invalid credentials");
    }
    const { password, ...safeUser } = user;
    return safeUser;
  },
};
