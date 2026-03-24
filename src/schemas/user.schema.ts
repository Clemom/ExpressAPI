import { z } from "zod";

export const createUserSchema = z.object({
  email: z.email({ message: "Invalid email" }),
  name: z.string().optional(),
  password: z.string(),
});