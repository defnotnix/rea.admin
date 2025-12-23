import { PropConfigField } from "@settle/admin";
import { z } from "zod";

export const moduleInfo = {
  label: "Applicant Configuration",
  description: "Manage applicant config settings",
  bread: [
    { label: "Admin Portal" },
    { label: "Applicant Config" },
  ],
};

export const configFields: PropConfigField[] = [
  {
    name: "name",
    label: "Category Name",
    placeholder: "e.g., Accommodation / Hospitality",
    type: "text",
    required: true,
  },
  {
    name: "jp_name",
    label: "Japanese Name",
    placeholder: "e.g., 宿泊",
    type: "text",
    required: true,
  },
];

// Zod validation schema
export const applicantConfigSchema = z.object({
  name: z.string().min(1, "Category name is required").min(3, "Must be at least 3 characters"),
  jp_name: z.string().min(1, "Japanese name is required").min(1, "Must be at least 1 character"),
});
