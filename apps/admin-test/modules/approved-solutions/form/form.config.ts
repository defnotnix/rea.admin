"use client";

import { createSolution, updateSolution } from "../module.api";

export const formConfig = {
  initial: {
    problem_id: "",
    chat_message_id: "",
    title: "",
    description: "",
    status: "draft",
    approved_by: "",
  },
  validation: [],
  apiSubmit: async (data: any, id?: any) => {
    if (id) {
      return await updateSolution(id, data);
    } else {
      return await createSolution(data);
    }
  },
};
