import axios from "axios";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:3001";

export const getProblems = async () => {
  const res = await axios.get(`${API_BASE}/problems`);
  return res?.data;
};

export const getProblemById = async (id: string) => {
  const res = await axios.get(`${API_BASE}/problems/${id}`);
  return res?.data;
};

export const createProblem = async (data: any) => {
  const res = await axios.post(`${API_BASE}/problems`, data);
  return res?.data;
};

export const updateProblem = async (id: string, data: any) => {
  const res = await axios.put(`${API_BASE}/problems/${id}`, data);
  return res?.data;
};

export const approveProblem = async (id: string, data: any) => {
  const res = await axios.put(`${API_BASE}/problems/${id}/approve`, data);
  return res?.data;
};

export const rejectProblem = async (id: string, rejectionReason: string) => {
  const res = await axios.put(`${API_BASE}/problems/${id}/reject`, {
    rejection_reason: rejectionReason,
  });
  return res?.data;
};

export const solveProblem = async (id: string, solutionData: any) => {
  const res = await axios.put(`${API_BASE}/problems/${id}/solve`, solutionData);
  return res?.data;
};
