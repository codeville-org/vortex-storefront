import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Please enter a valid email address"),

  password: z
    .string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .max(100, "Password must be less than 100 characters")
});

export type LoginSchema = z.infer<typeof loginSchema>;
