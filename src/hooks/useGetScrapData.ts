import { useQuery } from "@tanstack/react-query";
import { PolicyListSchema, PolicyListType } from "@/types/PolicyType";
import { HospitalListSchema, HospitalListType } from "@/types/HospitalType";
import { logValidationError, validateApiResponse } from "@/utils/zodHelpers";
import { getScrapHospital, getScrapPolicy } from "@/apis";

export const useGetScrapPolicy = (enabled: boolean) => {
  return useQuery<PolicyListType[], Error>({
    queryKey: ["policyData"],
    queryFn: async (): Promise<PolicyListType[]> => {
      try {
        const response = await getScrapPolicy();
        return validateApiResponse(response, PolicyListSchema.array());
      } catch (error) {
        logValidationError(error);
        throw error;
      }
    },
    enabled,
  });
};

export const useGetScrapHospital = (enabled: boolean) => {
  return useQuery<HospitalListType[], Error>({
    queryKey: ["hospitalData"],
    queryFn: async (): Promise<HospitalListType[]> => {
      try {
        const response = await getScrapHospital();
        return validateApiResponse(response, HospitalListSchema.array());
      } catch (error) {
        logValidationError(error);
        throw error;
      }
    },
    enabled,
  });
};
