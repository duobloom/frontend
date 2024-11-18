import { HospitalListType } from "@/types";
import apiClient from "../axios";
import { z } from "zod";
import { validateApiResponse } from "@/utils/zodHelpers";
import { HospitalListSchema } from "@/types/HospitalType";

export const getScrapHospital = async () => {
  const response = await apiClient.get<HospitalListType[]>(`/api/hospital-scrap`);
  return validateApiResponse(response, HospitalListSchema.array(), "hospital 스크랩 데이터 검증 실패");
};

export const postScrapHospital = async (hospitalId?: number): Promise<string> => {
  const response = await apiClient.post<string>(`/api/hospital-scrap/${hospitalId}`);
  return validateApiResponse(response, z.string());
};

export const deleteScrapHospital = async (hospitalId?: number): Promise<string> => {
  const response = await apiClient.delete<string>(`/api/hospital-scrap/${hospitalId}`);
  return validateApiResponse(response, z.string());
};
