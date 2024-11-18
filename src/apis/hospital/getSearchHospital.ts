import { HospitalListType } from "@/types";
import { HospitalListSchema } from "@/types/HospitalType";
import apiClient from "../axios";
import { validateApiResponse } from "@/utils/zodHelpers";

export const getSearchHospital = async (keyword?: string): Promise<HospitalListType[]> => {
  const response = await apiClient.get<HospitalListType[]>(`/api/hospitals/search?name=${keyword}`);
  return validateApiResponse(response, HospitalListSchema.array(), "hospital 검색 데이터 검증 실패");
};
