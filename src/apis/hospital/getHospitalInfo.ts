import { HospitalType } from "@/types";
import apiClient from "../axios";
import { HospitalSchema } from "@/types/HospitalType";
import { validateApiResponse } from "@/utils/zodHelpers";

export const getHospitalInfo = async (hospitalId?: number): Promise<HospitalType> => {
  const response = await apiClient<HospitalType>(`/api/hospitals/${hospitalId}`);
  console.log(response.data);
  return validateApiResponse(response, HospitalSchema, "hospital 상세 데이터 검증 실패");
};
