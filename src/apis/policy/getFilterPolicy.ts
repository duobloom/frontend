import { PolicyListType } from "@/types";
import apiClient from "../axios";
import { validateApiResponse } from "@/utils/zodHelpers";
import { PolicyListSchema } from "@/types/PolicyType";

export const getFilterPolicy = async (
  region_code?: number | null,
  middle_code?: number | null,
  detail_code?: number | null,
  option?: string | null,
): Promise<PolicyListType[]> => {
  const params = {
    ...(region_code ? { region: region_code } : {}),
    ...(middle_code ? { middle: middle_code } : {}),
    ...(detail_code ? { detail: detail_code } : {}),
    ...(option ? { keyword: option } : {}),
  };

  const response = await apiClient.get<PolicyListType[]>("/api/policies/filter", { params });
  console.log(response.data);
  return validateApiResponse(response, PolicyListSchema.array(), "policy 데이터 검증 실패");
};
