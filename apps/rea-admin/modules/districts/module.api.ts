import axios from "axios";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:3001";

export const getDistricts = async () => {
  const res = await axios.get(`${API_BASE}/districts`);
  return res?.data;
};

export const getDistrictById = async (id: string) => {
  const res = await axios.get(`${API_BASE}/districts/${id}`);
  return res?.data;
};

export const createDistrict = async (data: any) => {
  const res = await axios.post(`${API_BASE}/districts`, data);
  return res?.data;
};

export const updateDistrict = async (id: string, data: any) => {
  const res = await axios.put(`${API_BASE}/districts/${id}`, data);
  return res?.data;
};

export const deleteDistrict = async (id: string) => {
  const res = await axios.delete(`${API_BASE}/districts/${id}`);
  return res?.data;
};
