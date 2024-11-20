import { HospitalListType } from "@/types";
import apiClient from "@/apis/axios";

export const getSearchHospital = async (keyword?: string) => {
  const response = await apiClient.get<HospitalListType[]>(
    `${import.meta.env.VITE_APP_API_ENDPOINT}/api/hospitals/search?name=${keyword}`,
  );
  console.log(response.data);
  return response;
};
