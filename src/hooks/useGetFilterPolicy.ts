import { useQuery } from "@tanstack/react-query";
import { getFilterPolicy } from "@/apis";

export const useGetFilterPolicy = (
  regionCode: number | null,
  middleCode: number | null,
  detailCode: number | null,
  option: string | null,
) => {
  return useQuery({
    queryKey: ["PolicyData", regionCode, middleCode, detailCode, option],
    queryFn: () => getFilterPolicy(regionCode, middleCode, detailCode, option),
  });
};
