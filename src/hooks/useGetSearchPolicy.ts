import { useQuery } from "@tanstack/react-query";
import { getSearchPolicy } from "@/apis";

export const useGetSearchPolicy = (keyword: string, enabled: boolean) => {
  return useQuery({
    queryKey: ["policyData", keyword],
    queryFn: () => {
      return getSearchPolicy(keyword);
    },
    enabled,
  });
};
