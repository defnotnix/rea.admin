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
  description: z
    .string()
    .min(1, "Description is required")
    .min(10, "Description must be at least 10 characters")
    .max(5000, "Description must not exceed 5000 characters"),
  status: z
    .enum(["draft", "proposed", "reviewed", "approved", "rejected"])
    .default("draft"),
});

export type SolutionFormData = z.infer<typeof solutionFormSchema>;
