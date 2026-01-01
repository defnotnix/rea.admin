import { createThread, createMessage, createSolution } from "../../module.api";
import {
  threadFormSchema,
  messageFormSchema,
  solutionFormSchema,
} from "./schemas";

export const threadFormConfig = {
  initial: {
    title: "",
  },
  validation: [],
  apiSubmit: async (data: any) => {
    const validated = threadFormSchema.parse(data);
    return await createThread({
      title: validated.title,
    });
  },
};

export const messageFormConfig = {
  initial: {
    content: "",
  },
  validation: [],
  apiSubmit: async (data: any) => {
    const validated = messageFormSchema.parse(data);
    return await createMessage({
      content: validated.content,
    });
  },
};

export const solutionFormConfig = {
  initial: {
    title: "",
    description: "",
    status: "draft",
  },
  validation: [],
  apiSubmit: async (data: any) => {
    const validated = solutionFormSchema.parse(data);
    return await createSolution({
      title: validated.title,
      description: validated.description,
      status: validated.status,
    });
  },
};
