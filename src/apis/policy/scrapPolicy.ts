import { PolicyListType } from "@/types";
import axios from "axios";

export const getScrapPolicy = async () => {
  const response = await axios.get<PolicyListType>("/api/policy-scrap");
  return response;
};

export const postScrapPolicy = async (policyId?: number) => {
  await axios.post(`/api/policy-scrap/${policyId}`);
};

export const deleteScrapPolicy = async (policyId?: number) => {
  const response = await axios.delete(`/api/policy-scrap/${policyId}`);
  console.log(response);
};
