import { HospitalListType } from "@/types";
import axios from "axios";

export const getSearchHospital = async (keyword?: string) => {
  const response = await axios.get<HospitalListType[]>(`/api/hospitals/search/name=${keyword}`);
  console.log(response.data);
  return response;
};
