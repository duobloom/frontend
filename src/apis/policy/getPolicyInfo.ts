import { PolicyType } from "@/types";
import axios from "axios";

export const getPolicyInfo = async (policyId?: number) => {
  const response = await axios.get<PolicyType[]>(`/api/policies/${policyId}`);
  console.log(response.data);
  return response;
};
