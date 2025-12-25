"use client";
import { moduleApiCall } from "@settle/core";

export const getUsers = async () => {
  return await moduleApiCall.getRecords({
    endpoint: "/api/users/",
  });
};

export const getUserById = async (id: string | number) => {
  return await moduleApiCall.getSingleRecord({
    endpoint: "/api/users/",
    id: String(id),
  });
};

export const createUser = async (data: any) => {
  return await moduleApiCall.createRecord({
    endpoint: "/api/users/",
    body: data,
  });
};

export const updateUser = async (id: string | number, data: any) => {
  return await moduleApiCall.editRecord({
    endpoint: "/api/users/",
    id: String(id),
    body: data,
  });
};

export const deleteUser = async (id: string | number) => {
  return await moduleApiCall.deleteRecord({
    endpoint: "/api/users/",
    id: String(id),
  });
};

export const getModeratorsByDistrict = async (districtId: string) => {
  return await moduleApiCall.getRecords({
    endpoint: "/api/users/",
    params: { district: districtId, role: "moderator" },
  });
};
