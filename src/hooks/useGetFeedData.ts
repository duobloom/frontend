import { useQuery } from "@tanstack/react-query";
import { getFeedData } from "@/apis/main/getFeedDataAPI";
import { FeedResponseSchema, FeedResponseType } from "@/types/FeedType";
import { validateApiResponse, logValidationError } from "@/utils/zodHelpers";

export const useGetFeedData = (date: string) => {
  return useQuery<FeedResponseType, Error>({
    queryKey: ["feed", date],
    queryFn: async () => {
      try {
        const response = await getFeedData(date);
        return validateApiResponse(response, FeedResponseSchema);
      } catch (error) {
        logValidationError(error);
        throw error;
      }
    },
    enabled: !!date,
    gcTime: 0,
  });
};
