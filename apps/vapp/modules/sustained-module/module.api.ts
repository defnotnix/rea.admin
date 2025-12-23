import axios from "axios";
import { moduleApiCall } from "@settle/core";

const getRecords = async () => {
  const res = await axios.get("https://dummyjson.com/products?limit=100");
  return res?.data;
};

export { getRecords };
