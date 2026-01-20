import { z } from "zod";

export const RegisterSchema = z.object({
  firstName: z
    .string()
    .trim()
    .nonempty("First name is required")
    .min(2, "First name is too short")
    .max(20),
  lastName: z
    .string()
    .trim()
    .nonempty("Last name is required")
    .min(2, "Last name is too short")
    .max(20),
  email: z
    .string()
    .trim()
    .nonempty("Email is required")
    .email("Please enter a valid email"),
  password: z
    .string()
    .nonempty("Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(20)
    .regex(/[A-Za-z]/, "Password must contain a letter")
    .regex(/[0-9]/, "Password must contain a number"),
  confirmPassword: z
    .string()
    .nonempty("Password Confirmation is required")
    .min(6, "Confirm password is required"),
});

export const RegisterSchemaWithConfirm = RegisterSchema.refine(
  (data) => data.password === data.confirmPassword,
  {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  }
);

export type RegisterInput = z.infer<typeof RegisterSchemaWithConfirm>;

export const LoginSchema = z.object({
  email: z
    .string()
    .trim()
    .nonempty("Email is required")
    .email("Please enter a valid email"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(20, "Password must be at most 20 characters"),
});

export type LoginInput = z.infer<typeof LoginSchema>;
