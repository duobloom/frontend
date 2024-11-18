import { useQuery } from "@tanstack/react-query";
import { getFeedData } from "@/apis/main/getFeedDataAPI";

export const useGetFeedData = (date: string) => {
  return useQuery({
    queryKey: ["feed", date],
    queryFn: () => getFeedData(date),
    enabled: !!date,
  });
};
