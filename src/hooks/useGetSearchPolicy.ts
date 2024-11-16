import { useQuery } from "@tanstack/react-query";
import { validateApiResponse, logValidationError } from "@/utils/zodHelpers";
import { getSearchHospital } from "@/apis";
import { PolicyListType } from "@/types";
import { PolicyListSchema } from "@/types/PolicyType";

export const useGetSearchPolicy = (keyword: string, enabled: boolean = true) => {
  return useQuery<PolicyListType[], Error>({
    queryKey: ["policyData", keyword],
    queryFn: async (): Promise<PolicyListType[]> => {
      try {
        const response = await getSearchHospital(keyword);
        return validateApiResponse(response, PolicyListSchema.array());
      } catch (error) {
        logValidationError(error);
        throw error;
      }
    },
    enabled,
  });
};
