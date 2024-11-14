import { useQuery } from "@tanstack/react-query";
import { getHospitaInfo } from "@/apis";
import { HospitalSchema, HospitalType } from "@/types/HospitalType";
import { validateApiResponse, logValidationError } from "@/utils/zodHelpers";

export const useGetHospitalInfo = (hospitalId: number) => {
  return useQuery<HospitalType, Error>({
    queryKey: ["hospitalData", hospitalId],
    queryFn: async (): Promise<HospitalType> => {
      try {
        const response = await getHospitaInfo(hospitalId);
        return validateApiResponse(response, HospitalSchema);
      } catch (error) {
        logValidationError(error);
        throw error;
      }
    },
  });
};
