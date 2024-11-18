import { PolicyListType } from "@/types";
import { PolicyListSchema } from "@/types/PolicyType";
import { validateApiResponse } from "@/utils/zodHelpers";
import apiClient from "../axios";

export const getSearchPolicy = async (keyword?: string): Promise<PolicyListType[]> => {
  const response = await apiClient.get<PolicyListType[]>(`/api/policies/search?name=${keyword}`);
  return validateApiResponse(response, PolicyListSchema.array(), "hospital 검색 데이터 검증 실패");
};
