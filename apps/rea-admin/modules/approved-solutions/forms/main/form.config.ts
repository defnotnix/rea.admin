import { approveSolution } from "../../module.api";

export const formConfig = {
  initial: {
    problem_id: "",
    chat_message_id: "",
    title: "",
    description: "",
    status: "draft",
    approved_by: "",
  },
  validation: [
    {
      problem_id: "string().required('Problem ID is required')",
      chat_message_id: "string().required('Chat message ID is required')",
      title: "string().min(2, 'Title must be at least 2 characters').required('Title is required')",
      description: "string().min(1, 'Description is required').required('Description is required')",
      status: "string().required('Status is required')",
    },
  ],
  apiSubmit: async (data: any) => {
    try {
      const response = await approveSolution(data.chat_message_id, {
        title: data.title,
        description: data.description,
        status: data.status,
        approved_by: data.approved_by,
      });
      return response;
    } catch (error) {
      console.error("Error creating approved solution:", error);
      throw error;
    }
  },
};
