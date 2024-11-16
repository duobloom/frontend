import { useQuery } from "@tanstack/react-query";
import { validateApiResponse, logValidationError } from "@/utils/zodHelpers";
import { PolicyListType } from "@/types";
import { PolicyListSchema } from "@/types/PolicyType";
import { getSearchPolicy } from "@/apis";

export const useGetSearchPolicy = (keyword: string, enabled: boolean) => {
  return useQuery<PolicyListType[], Error>({
    queryKey: ["policyData", keyword],
    queryFn: async (): Promise<PolicyListType[]> => {
      try {
        const response = await getSearchPolicy(keyword);
        return validateApiResponse(response, PolicyListSchema.array());
      } catch (error) {
        logValidationError(error);
        throw error;
      }
    },
    enabled,
  });
};
