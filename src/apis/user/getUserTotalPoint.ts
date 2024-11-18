import { z } from "zod";
import apiClient from "@/apis/axios";
import { validateApiResponse } from "@/utils/zodHelpers";

export const getUserTotalPoint = async (): Promise<number> => {
  const response = await apiClient.get<number>(`/api/points`);
  return validateApiResponse(response, z.number(), "Feed 데이터 검증 실패");
};
