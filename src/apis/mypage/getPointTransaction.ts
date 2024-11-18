import { PointType } from "@/types";
import apiClient from "../axios";
import { PointSchema } from "@/types/PointType";
import { validateApiResponse } from "@/utils/zodHelpers";

export const getPointTransaction = async (): Promise<PointType[]> => {
  const response = await apiClient.get<PointType[]>("/api/points/history");
  console.log(response.data);
  return validateApiResponse(response, PointSchema.array(), "포인트 거래내역 데이터 검증 실패");
};
