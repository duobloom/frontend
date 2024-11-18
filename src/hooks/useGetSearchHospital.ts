import { useQuery } from "@tanstack/react-query";
import { getSearchHospital } from "@/apis";

export const useGetSearchHospital = (keyword: string, enabled: boolean) => {
  return useQuery({
    queryKey: ["hospitalData", keyword],
    queryFn: () => {
      return getSearchHospital(keyword);
    },
    enabled,
  });
};
