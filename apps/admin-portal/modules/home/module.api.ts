"use client";
import { moduleApiCall } from "@settle/core";

export const getDashboardStats = async () => {
  return await moduleApiCall.getRecords({
    endpoint: "/api/stats/",
  });
};

export const getDashboardMetrics = async () => {
  return await moduleApiCall.getRecords({
    endpoint: "/api/metrics/",
  });
};

export const getRecentActivity = async () => {
  return await moduleApiCall.getRecords({
    endpoint: "/api/activity/",
  });
};
