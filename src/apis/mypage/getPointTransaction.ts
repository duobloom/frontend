import { PointType } from "@/types";
import axios from "axios";

export const getPointTransaction = async () => {
  const response = await axios.get<PointType[]>(`${import.meta.env.VITE_APP_API_ENDPOINT}/api/points/history`);
  console.log(response.data);
  return response;
};
