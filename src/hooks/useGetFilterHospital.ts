import { useQuery } from "@tanstack/react-query";
import { getFilterHospital } from "@/apis";
import { HospitalListSchema, HospitalListType } from "@/types/HospitalType";
import { validateApiResponse, logValidationError } from "@/utils/zodHelpers";

export const useGetFilterHospital = (
  regionCode: number | null,
  middleCode: number | null,
  detailCode: number | null,
  option: string | null,
  department: string | null,
) => {
  return useQuery<HospitalListType[], Error>({
    queryKey: ["hospitalData", regionCode, middleCode, detailCode, option, department],
    queryFn: async (): Promise<HospitalListType[]> => {
      try {
        const response = await getFilterHospital(regionCode, middleCode, detailCode, option, department);
        return validateApiResponse(response, HospitalListSchema.array());
      } catch (error) {
        logValidationError(error);
        throw error;
      }
    },
  });
};
