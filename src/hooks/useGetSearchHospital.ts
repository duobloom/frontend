import { useQuery } from "@tanstack/react-query";
import { HospitalListSchema, HospitalListType } from "@/types/HospitalType";
import { validateApiResponse, logValidationError } from "@/utils/zodHelpers";
import { getSearchHospital } from "@/apis";

export const useGetSearchHospital = (keyword: string) => {
  return useQuery<HospitalListType[], Error>({
    queryKey: ["hospitalData", keyword],
    queryFn: async (): Promise<HospitalListType[]> => {
      try {
        const response = await getSearchHospital(keyword);
        return validateApiResponse(response, HospitalListSchema.array());
      } catch (error) {
        logValidationError(error);
        throw error;
      }
    },
  });
};
