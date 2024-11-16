import { useQuery } from "@tanstack/react-query";
import { validateApiResponse, logValidationError } from "@/utils/zodHelpers";
import { PolicyListType } from "@/types";
import { getFilterPolicy } from "@/apis";
import { PolicyListSchema } from "@/types/PolicyType";

export const useGetFilterPolicy = (
  regionCode: number | null,
  middleCode: number | null,
  detailCode: number | null,
  option: string | null,
) => {
  return useQuery<PolicyListType[], Error>({
    queryKey: ["PolicyData", regionCode, middleCode, detailCode, option],
    queryFn: async (): Promise<PolicyListType[]> => {
      try {
        const response = await getFilterPolicy(regionCode, middleCode, detailCode, option);
        return validateApiResponse(response, PolicyListSchema.array());
      } catch (error) {
        logValidationError(error);
        throw error;
      }
    },
  });
};
