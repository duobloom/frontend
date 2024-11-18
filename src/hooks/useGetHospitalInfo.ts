import { useQuery } from "@tanstack/react-query";
import { getHospitalInfo } from "@/apis";

export const useGetHospitalInfo = (hospitalId: number) => {
  return useQuery({
    queryKey: ["hospitalData", hospitalId],
    queryFn: () => getHospitalInfo(hospitalId),
  });
};
