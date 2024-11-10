import { HospitalType } from "@/types";
import axios from "axios";

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

  const response = await axios.get<HospitalType[]>(
    "http://ec2-52-78-212-34.ap-northeast-2.compute.amazonaws.com:8080/api/hospitals/search",
    { params },
  );
  console.log(params);
  console.log(response.data);
  return response.data;
};