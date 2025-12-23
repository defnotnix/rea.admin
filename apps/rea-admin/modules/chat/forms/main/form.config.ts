import axios from "axios";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:3001";

const createChatMessage = async (data: any) => {
  const res = await axios.post(`${API_BASE}/chat-messages`, data);
  return res?.data;
};

export const formConfig = {
  initial: {
    problem_id: "",
    user_id: "",
    content: "",
    message_type: "comment",
    status: "active",
  },
  validation: [
    {
      problem_id: "string().required('Problem ID is required')",
      user_id: "string().required('User ID is required')",
      content: "string().min(1, 'Message content is required').required('Message content is required')",
      message_type: "string().required('Message type is required')",
      status: "string().required('Status is required')",
    },
  ],
  apiSubmit: async (data: any) => {
    try {
      const response = await createChatMessage(data);
      return response;
    } catch (error) {
      console.error("Error creating chat message:", error);
      throw error;
    }
  },
};
