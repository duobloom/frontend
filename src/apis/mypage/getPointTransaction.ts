import { PointType } from "@/types";
import apiClient from "@/apis/axios";

export const getPointTransaction = async () => {
  const response = await apiClient.get<PointType[]>(`${import.meta.env.VITE_APP_API_ENDPOINT}/api/points/history`);
  console.log(response.data);
  return response;
};
