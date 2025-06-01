import { z } from "zod";

export const registerSchema = z
  .object({
    email: z
      .string({ required_error: "Email is required" })
      .min(1, "Email is required")
      .email("Please enter a valid email address"),

    firstName: z
      .string()
      .transform((val) => (val === "" ? undefined : val))
      .optional(),

    lastName: z
      .string()
      .transform((val) => (val === "" ? undefined : val))
      .optional(),

    password: z
      .string({ required_error: "Password is required" })
      .min(1, "Please enter your password")
      .max(100, "Password must be less than 100 characters"),

    confirmPassword: z
      .string({
        required_error: "Please confirm your password"
      })
      .min(1, "Please confirm your password")
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"]
  });

export type RegisterSchema = z.infer<typeof registerSchema>;
