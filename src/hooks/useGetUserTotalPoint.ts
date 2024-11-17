import { z } from "zod";
import { useQuery } from "@tanstack/react-query";
import { getUserTotalPoint } from "@/apis";
import { validateApiResponse, logValidationError } from "@/utils/zodHelpers";

export const useGetUserTotalPoint = () => {
  return useQuery<number, Error>({
    queryKey: ["point"],
    queryFn: async () => {
      try {
        const response = await getUserTotalPoint();
        return validateApiResponse(response, z.number());
      } catch (error) {
        logValidationError(error);
        throw error;
      }
    },
  });
};
