import apiClient from "@/apis/axios";
import { FeedResponseSchema, FeedResponseType } from "@/types/FeedType";
import { validateApiResponse } from "@/utils/zodHelpers";

export const getFeedData = async (date: string): Promise<FeedResponseType> => {
  const response = await apiClient.get<FeedResponseType>(`/api/feeds/${date}`);
  return validateApiResponse(response, FeedResponseSchema, "Feed 데이터 검증 실패");
};
