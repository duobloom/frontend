import { PolicyType } from "@/types";
import apiClient from "../axios";
import { validateApiResponse } from "@/utils/zodHelpers";
import { PolicySchema } from "@/types/PolicyType";

export const getPolicyInfo = async (policyId?: number): Promise<PolicyType> => {
  const response = await apiClient.get<PolicyType>(`/api/policies/${policyId}`);
  console.log(response.data);
  return validateApiResponse(response, PolicySchema, "policy 상세 데이터 검증 실패");
};
