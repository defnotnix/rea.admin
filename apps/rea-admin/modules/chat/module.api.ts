import axios from "axios";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:3001";

export const getChatMessages = async () => {
  const res = await axios.get(`${API_BASE}/chat-messages`);
  return res?.data;
};

export const getMessagesByProblem = async (problemId: string) => {
  const res = await axios.get(`${API_BASE}/problems/${problemId}/messages`);
  return res?.data;
};

export const getMessageById = async (id: string) => {
  const res = await axios.get(`${API_BASE}/chat-messages/${id}`);
  return res?.data;
};

export const deleteMessage = async (id: string, deletedBy: string) => {
  const res = await axios.put(`${API_BASE}/chat-messages/${id}`, {
    is_deleted: true,
    deleted_by: deletedBy,
  });
  return res?.data;
};

export const getSolutions = async () => {
  const res = await axios.get(`${API_BASE}/chat-messages/solutions`);
  return res?.data;
};

export const getSolutionsByProblem = async (problemId: string) => {
  const res = await axios.get(
    `${API_BASE}/problems/${problemId}/solutions`
  );
  return res?.data;
};
