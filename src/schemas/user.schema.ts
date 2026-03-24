import { z } from "zod";

export const registerSchema = z.object({
  email: z.email({ message: "Invalid email" }),
  name: z.string().optional(),
  password: z.string().min(8).refine((val) => {
    const hasUpper = /[A-Z]/.test(val);
    const hasLower = /[a-z]/.test(val);
    const hasNumber = /[0-9]/.test(val);
    const hasSpecial = /[^A-Za-z0-9]/.test(val);

    return hasUpper && hasLower && hasNumber && hasSpecial;
  }, {
    message: "Password too weak",
  })
});

export const loginSchema = z.object({
  email: z.email({ message: "Invalid email" }),
  password: z.string().min(1, { message: "Password is required" })
});