import { PolicyType } from "@/types";
import axios from "axios";

export const getPolicyInfo = async (policyId?: number) => {
  const response = await axios.get<PolicyType[]>(`${import.meta.env.VITE_APP_API_ENDPOINT}/api/policies/${policyId}`);
  console.log(response.data);
  return response;
};
