import { useQuery } from "@tanstack/react-query";
import { validateApiResponse, logValidationError } from "@/utils/zodHelpers";
import { getPointTransaction } from "@/apis";
import { PointSchema, PointType } from "@/types/PointType";

export const useGetPointTransaction = () => {
  return useQuery<PointType[], Error>({
    queryKey: ["TransactionData"],
    queryFn: async (): Promise<PointType[]> => {
      try {
        const response = await getPointTransaction();
        return validateApiResponse(response, PointSchema.array());
      } catch (error) {
        logValidationError(error);
        throw error;
      }
    },
  });
};
