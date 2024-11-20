import { HospitalType } from "@/types";
import apiClient from "@/apis/axios";

export const getHospitaInfo = async (hospitalId?: number) => {
  const response = await apiClient.get<HospitalType>(
    `${import.meta.env.VITE_APP_API_ENDPOINT}/api/hospitals/${hospitalId}`,
  );
  console.log(response.data);
  return response;
};
