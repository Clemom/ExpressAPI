import { prisma } from "../lib/prisma";
import { CreateUserDto, LoginUserDto } from "../dto/user.dto";
import bcrypt from "bcrypt";

export const userService = {
  getUserById: async (id: string) => {
    return prisma.user.findUnique({
      where: { id },
    });
  },

  createUser: async (data: CreateUserDto) => {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    return prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });
  },

  loginUser: async (data: LoginUserDto) => {
    const user = await prisma.user.findUnique({
      where: { email: data.email },
    });
    if (!user) {
      throw { status: 401, message: "Invalid credentials" };
    }

    const isValid = await bcrypt.compare(data.password, user.password);

    if (!isValid) {
      throw { status: 401, message: "Invalid credentials" };
    }
    const { password, ...safeUser } = user;
    return safeUser;
  },
};
