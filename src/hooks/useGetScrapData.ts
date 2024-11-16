import { useQuery } from "@tanstack/react-query";
import { PolicyListSchema, PolicyListType } from "@/types/PolicyType";
import { HospitalListSchema, HospitalListType } from "@/types/HospitalType";
import { validateApiResponse } from "@/utils/zodHelpers";
import { getScrapHospital, getScrapPolicy } from "@/apis";

export const useGetScrapPolicy = (enabled: boolean) => {
  return useQuery<PolicyListType[], Error>({
    queryKey: ["policyData"],
    queryFn: async () => {
      const response = await getScrapPolicy();
      return validateApiResponse(response, PolicyListSchema.array());
    },
    enabled,
  });
};

export const useGetScrapHospital = (enabled: boolean) => {
  return useQuery<HospitalListType[], Error>({
    queryKey: ["hospitalData"],
    queryFn: async () => {
      const response = await getScrapHospital();
      return validateApiResponse(response, HospitalListSchema.array());
    },
    enabled,
  });
};
