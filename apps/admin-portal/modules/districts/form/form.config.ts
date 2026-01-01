"use client";

import { createDistrict, updateDistrict } from "../module.api";

export const formConfig = {
  initial: {
    name: "",
    division: "",
    population: "",
    status: "active",
  },
  validation: [],
  apiSubmit: async (data: any, id?: any) => {
    if (id) {
      return await updateDistrict(id, data);
    } else {
      return await createDistrict(data);
    }
  },
};
