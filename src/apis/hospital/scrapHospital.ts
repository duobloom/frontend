import { HospitalListType } from "@/types";
import apiClient from "@/apis/axios";

export const getScrapHospital = async () => {
  const response = await apiClient.get<HospitalListType>(`${import.meta.env.VITE_APP_API_ENDPOINT}/api/hospital-scrap`);
  console.log(response.data);
  return response;
};

export const postScrapHospital = async (hospitalId?: number) => {
  await apiClient.post(`${import.meta.env.VITE_APP_API_ENDPOINT}/api/hospital-scrap/${hospitalId}`);
};

export const deleteScrapHospital = async (hospitalId?: number) => {
  await apiClient.delete(`${import.meta.env.VITE_APP_API_ENDPOINT}/api/hospital-scrap/${hospitalId}`);
};
