import { z } from "zod";

export const agendaApplyFormSchema = z.object({
  title: z
    .string()
    .min(1, "Problem title is required")
    .min(5, "Title must be at least 5 characters")
    .max(100, "Title must not exceed 100 characters"),
  problemStatement: z
    .string()
    .min(1, "Problem statement is required")
    .min(20, "Problem statement must be at least 20 characters")
    .max(500, "Problem statement must not exceed 500 characters"),
  description: z
    .string()
    .min(1, "Description is required")
    .min(20, "Description must be at least 20 characters")
    .max(2000, "Description must not exceed 2000 characters"),
  district: z.string().min(1, "Please select a district or location"),
});

export type AgendaApplyFormData = z.infer<typeof agendaApplyFormSchema>;

// Step-specific schemas
export const stepSchemas = {
  0: z.object({
    title: agendaApplyFormSchema.shape.title,
  }),
  1: z.object({
    problemStatement: agendaApplyFormSchema.shape.problemStatement,
  }),
  2: z.object({
    description: agendaApplyFormSchema.shape.description,
  }),
  3: z.object({
    district: agendaApplyFormSchema.shape.district,
  }),
} as const;

export const agendaApplyFormConfig = {
  initial: {
    title: "",
    problemStatement: "",
    description: "",
    district: "",
  },
};
