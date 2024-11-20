import { PolicyListType } from "@/types";
import axios from "axios";

export const getScrapPolicy = async () => {
  const response = await axios.get<PolicyListType>(`${import.meta.env.VITE_APP_API_ENDPOINT}/api/policy-scrap`);
  return response;
};

export const postScrapPolicy = async (policyId?: number) => {
  await axios.post(`${import.meta.env.VITE_APP_API_ENDPOINT}/api/policy-scrap/${policyId}`);
};

export const deleteScrapPolicy = async (policyId?: number) => {
  const response = await axios.delete(`${import.meta.env.VITE_APP_API_ENDPOINT}/api/policy-scrap/${policyId}`);
  console.log(response);
};
