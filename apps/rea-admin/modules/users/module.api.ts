import axios from "axios";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:3001";

export const getUsers = async () => {
  const res = await axios.get(`${API_BASE}/users`);
  return res?.data;
};

export const getUserById = async (id: string) => {
  const res = await axios.get(`${API_BASE}/users/${id}`);
  return res?.data;
};

export const createUser = async (data: any) => {
  const res = await axios.post(`${API_BASE}/users`, data);
  return res?.data;
};

export const updateUser = async (id: string, data: any) => {
  const res = await axios.put(`${API_BASE}/users/${id}`, data);
  return res?.data;
};

export const deleteUser = async (id: string) => {
  const res = await axios.delete(`${API_BASE}/users/${id}`);
  return res?.data;
};

export const getModeratorsByDistrict = async (districtId: string) => {
  const res = await axios.get(`${API_BASE}/users/moderators/${districtId}`);
  return res?.data;
};
