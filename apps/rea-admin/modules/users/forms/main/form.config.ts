import { createUser } from "../../module.api";

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
  validation: [
    {
      full_name: "string().min(2, 'Name must be at least 2 characters')",
      email: "string().email('Invalid email').required('Email is required')",
      phone_number: "string().min(10, 'Invalid phone number')",
      password_hash: "string().min(6, 'Password must be at least 6 characters')",
      district_id: "string().required('District is required')",
    },
  ],
  apiSubmit: async (data: any) => {
    try {
      const response = await createUser(data);
      return response;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  },
};
