import { z } from "zod";

export const registerSchema = z
  .object({
    full_name: z
      .string()
      .min(1, "Full name is required")
      .min(2, "Name must be at least 2 characters")
      .max(100, "Name must not exceed 100 characters"),

    email: z
      .string()
      .min(1, "Email is required")
      .email("Invalid email address"),

    phone_number: z
      .string()
      .min(1, "Phone number is required")
      .min(10, "Phone number must be at least 10 characters"),

    password: z
      .string()
      .min(1, "Password is required")
      .min(6, "Password must be at least 6 characters")
      .max(128, "Password must not exceed 128 characters"),

    confirm_password: z
      .string()
      .min(1, "Please confirm your password"),

    profession: z
      .string()
      .max(100, "Profession must not exceed 100 characters")
      .optional()
      .or(z.literal("")),

    district_id: z.string().min(1, "Please select a district"),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords don't match",
    path: ["confirm_password"],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email address"),

  password: z.string().min(1, "Password is required"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
