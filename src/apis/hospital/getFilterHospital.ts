import { HospitalListType } from "@/types";
import apiClient from "@/apis/axios";

export const getFilterHospital = async (
  region_code?: number | null,
  middle_code?: number | null,
  detail_code?: number | null,
  option?: string | null,
  department?: string | null,
) => {
  const params = {
    ...(region_code ? { region: region_code } : {}),
    ...(middle_code ? { middle: middle_code } : {}),
    ...(detail_code ? { detail: detail_code } : {}),
    ...(option ? { keyword: option } : {}),
    ...(department ? { type: department } : {}),
  };

  const response = await apiClient.get<HospitalListType[]>(
    `${import.meta.env.VITE_APP_API_ENDPOINT}/api/hospitals/filter`,
    { params },
  );
  return response;
};
