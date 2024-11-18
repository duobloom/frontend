import { HospitalListType } from "@/types";
import apiClient from "../axios";
import { HospitalListSchema } from "@/types/HospitalType";
import { validateApiResponse } from "@/utils/zodHelpers";

export const getFilterHospital = async (
  region_code?: number | null,
  middle_code?: number | null,
  detail_code?: number | null,
  option?: string | null,
  department?: string | null,
): Promise<HospitalListType[]> => {
  const params = {
    ...(region_code ? { region: region_code } : {}),
    ...(middle_code ? { middle: middle_code } : {}),
    ...(detail_code ? { detail: detail_code } : {}),
    ...(option ? { keyword: option } : {}),
    ...(department ? { type: department } : {}),
  };

  const response = await apiClient.get<HospitalListType[]>("/api/hospitals/filter", { params });
  return validateApiResponse(response, HospitalListSchema.array(), "hospital 데이터 검증 실패");
};
