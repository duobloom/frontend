import { useQuery } from "@tanstack/react-query";
import { validateApiResponse, logValidationError } from "@/utils/zodHelpers";
import { getPolicyInfo } from "@/apis";
import { PolicyType } from "@/types";
import { PolicySchema } from "@/types/PolicyType";

export const useGetPolicyInfo = (policyId: number) => {
  return useQuery<PolicyType, Error>({
    queryKey: ["policyData", policyId],
    queryFn: async (): Promise<PolicyType> => {
      try {
        const response = await getPolicyInfo(policyId);
        return validateApiResponse(response, PolicySchema);
      } catch (error) {
        logValidationError(error);
        throw error;
      }
    },
  });
};
