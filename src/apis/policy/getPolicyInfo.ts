import { PolicyType } from "@/types";
import apiClient from "@/apis/axios";

export const getPolicyInfo = async (policyId?: number) => {
  const response = await apiClient.get<PolicyType[]>(
    `${import.meta.env.VITE_APP_API_ENDPOINT}/api/policies/${policyId}`,
  );
  console.log(response.data);
  return response;
};
