import { HospitalType } from "@/types";
import axios from "axios";

export const getHospitaInfo = async (hospitalId?: number) => {
  const response = await axios.get<HospitalType>(`/api/hospitals/${hospitalId}`);
  console.log(response.data);
  return response.data;
};
