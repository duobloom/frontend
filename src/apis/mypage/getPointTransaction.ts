import { PointType } from "@/types";
import axios from "axios";

export const getPointTransaction = async () => {
  const response = await axios.get<PointType[]>("/api/points/history");
  console.log(response.data);
  return response;
};
