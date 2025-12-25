"use client";

import { createAgenda, updateAgenda } from "../module.api";

export const formConfig = {
  initial: {
    title: "",
    description: "",
    date: "",
    location: "",
    status: "active",
  },
  validation: [],
  apiSubmit: async (data: any, id?: any) => {
    if (id) {
      return await updateAgenda(id, data);
    } else {
      return await createAgenda(data);
    }
  },
};
