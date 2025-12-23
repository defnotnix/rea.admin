import { createDistrict } from "../../module.api";

export const formConfig = {
  initial: {
    name: "",
    division: "",
    population: "",
    status: "active",
  },
  validation: [
    {
      name: "string().min(2, 'Name must be at least 2 characters').required('Name is required')",
      division: "string().required('Division is required')",
      status: "string().required('Status is required')",
    },
  ],
  apiSubmit: async (data: any) => {
    try {
      const response = await createDistrict(data);
      return response;
    } catch (error) {
      console.error("Error creating district:", error);
      throw error;
    }
  },
};
