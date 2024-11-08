import { HospitalType } from "@/types";
import axios from "axios";

export const getSearchHospitalRegion = async (
  region_code: number | null,
  middle_code: number | null,
  detail_code?: number | null,
) => {
  const params = {
    region: region_code,
    middle: middle_code,
    ...(detail_code ? { detail: detail_code } : {}),
  };

  const response = await axios.get<HospitalType[]>("/hospitals/search", { params });
  return response.data;
};
