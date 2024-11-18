import { useQuery } from "@tanstack/react-query";
import { getPolicyInfo } from "@/apis";

export const useGetPolicyInfo = (policyId: number) => {
  return useQuery({
    queryKey: ["policyData", policyId],
    queryFn: () => getPolicyInfo(policyId),
  });
};
