import { useQuery } from "@tanstack/react-query";
import { getScrapHospital, getScrapPolicy } from "@/apis";

export const useGetScrapPolicy = (enabled: boolean) => {
  return useQuery({
    queryKey: ["policyData"],
    queryFn: () => {
      return getScrapPolicy();
    },
    enabled,
  });
};

export const useGetScrapHospital = (enabled: boolean) => {
  return useQuery({
    queryKey: ["hospitalData"],
    queryFn: () => {
      return getScrapHospital();
    },
    enabled,
  });
};
