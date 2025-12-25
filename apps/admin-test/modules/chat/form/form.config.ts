"use client";

import { createMessage, updateMessage } from "../module.api";

export const formConfig = {
  initial: {
    problem_id: "",
    user_id: "",
    content: "",
    message_type: "comment",
    status: "active",
  },
  validation: [],
  apiSubmit: async (data: any, id?: any) => {
    if (id) {
      return await updateMessage(id, data);
    } else {
      return await createMessage(data);
    }
  },
};
