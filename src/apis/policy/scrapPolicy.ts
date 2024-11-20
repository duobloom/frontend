import { PolicyListType } from "@/types";
import apiClient from "@/apis/axios";

export const getScrapPolicy = async () => {
  const response = await apiClient.get<PolicyListType>(`${import.meta.env.VITE_APP_API_ENDPOINT}/api/policy-scrap`);
  return response;
};

export const postScrapPolicy = async (policyId?: number) => {
  await apiClient.post(`${import.meta.env.VITE_APP_API_ENDPOINT}/api/policy-scrap/${policyId}`);
};

export const deleteScrapPolicy = async (policyId?: number) => {
  const response = await apiClient.delete(`${import.meta.env.VITE_APP_API_ENDPOINT}/api/policy-scrap/${policyId}`);
  console.log(response);
};
