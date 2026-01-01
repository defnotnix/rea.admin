import { z } from "zod";

export const threadFormSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .min(3, "Title must be at least 3 characters")
    .max(255, "Title must not exceed 255 characters"),
});

export type ThreadFormData = z.infer<typeof threadFormSchema>;

export const messageFormSchema = z.object({
  content: z
    .string()
    .min(1, "Message is required")
    .min(3, "Message must be at least 3 characters")
    .max(5000, "Message must not exceed 5000 characters"),
});

export type MessageFormData = z.infer<typeof messageFormSchema>;

export const solutionFormSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .min(5, "Title must be at least 5 characters")
    .max(255, "Title must not exceed 255 characters"),
  summary: z
    .string()
    .min(10, "Summary must be at least 10 characters")
    .max(500, "Summary must not exceed 500 characters")
    .optional()
    .or(z.literal("")),
  description: z
    .string()
    .optional()
    .or(z.literal("")),
  status: z
    .enum(["draft", "pending", "approved", "rejected"])
    .optional(),
});

export type SolutionFormData = z.infer<typeof solutionFormSchema>;
