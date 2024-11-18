import { useQuery } from "@tanstack/react-query";
import { getUserTotalPoint } from "@/apis";

export const useGetUserTotalPoint = () => {
  return useQuery({
    queryKey: ["points"],
    queryFn: getUserTotalPoint,
    staleTime: 1000 * 60 * 5, // 5분
  });
};
