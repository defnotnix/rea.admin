"use client";

import { createUser, updateUser } from "../module.api";

export const formConfig = {
  initial: {
    full_name: "",
    email: "",
    phone_number: "",
    password_hash: "",
    profession: "",
    district_id: "",
    is_moderator: false,
    is_verified: false,
    is_active: true,
  },
  validation: [],
  apiSubmit: async (data: any, id?: any) => {
    if (id) {
      return await updateUser(id, data);
    } else {
      return await createUser(data);
    }
  },
};
