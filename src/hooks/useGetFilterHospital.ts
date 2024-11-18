import { useQuery } from "@tanstack/react-query";
import { getFilterHospital } from "@/apis";

export const useGetFilterHospital = (
  regionCode: number | null,
  middleCode: number | null,
  detailCode: number | null,
  option: string | null,
  department: string | null,
) => {
  return useQuery({
    queryKey: ["hospitalData", regionCode, middleCode, detailCode, option, department],
    queryFn: () => getFilterHospital(regionCode, middleCode, detailCode, option, department),
  });
};
