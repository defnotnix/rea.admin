import axios from "axios";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:3001";

export const getApprovedSolutions = async () => {
  const res = await axios.get(`${API_BASE}/approved-solutions`);
  return res?.data;
};

export const getApprovedSolutionById = async (id: string) => {
  const res = await axios.get(`${API_BASE}/approved-solutions/${id}`);
  return res?.data;
};

export const getSolutionsByProblem = async (problemId: string) => {
  const res = await axios.get(
    `${API_BASE}/problems/${problemId}/approved-solutions`
  );
  return res?.data;
};

export const approveSolution = async (messageId: string, data: any) => {
  const res = await axios.post(`${API_BASE}/approved-solutions`, {
    original_message_id: messageId,
    ...data,
  });
  return res?.data;
};

export const publishSolution = async (id: string) => {
  const res = await axios.put(`${API_BASE}/approved-solutions/${id}`, {
    is_published: true,
  });
  return res?.data;
};

export const unpublishSolution = async (id: string) => {
  const res = await axios.put(`${API_BASE}/approved-solutions/${id}`, {
    is_published: false,
  });
  return res?.data;
};

export const getTrendingSolutions = async () => {
  const res = await axios.get(`${API_BASE}/solutions/trending`);
  return res?.data;
};
