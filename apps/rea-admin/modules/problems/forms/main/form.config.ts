import { createProblem } from "../../module.api";

export const formConfig = {
  initial: {
    title: "",
    description: "",
    district_id: "",
    status: "pending",
  },
  validation: [
    {
      field: "title",
      message: "Problem title is required",
      type: "required",
    },
    {
      field: "title",
      message: "Title must be at least 10 characters",
      type: "minLength",
      value: 10,
    },
    {
      field: "description",
      message: "Problem description is required",
      type: "required",
    },
    {
      field: "description",
      message: "Description must be at least 20 characters",
      type: "minLength",
      value: 20,
    },
    {
      field: "district_id",
      message: "District is required",
      type: "required",
    },
  ],
  apiSubmit: async (data: any) => {
    try {
      const response = await createProblem(data);
      return response;
    } catch (error) {
      console.error("Error creating problem:", error);
      throw error;
    }
  },
};
