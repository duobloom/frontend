import { PolicyListType } from "@/types";
import axios from "axios";

export const getFilterPolicy = async (
  region_code?: number | null,
  middle_code?: number | null,
  detail_code?: number | null,
  option?: string | null,
) => {
  const params = {
    ...(region_code ? { region: region_code } : {}),
    ...(middle_code ? { middle: middle_code } : {}),
    ...(detail_code ? { detail: detail_code } : {}),
    ...(option ? { keyword: option } : {}),
  };

  const response = await axios.get<PolicyListType[]>("/api/policies/filter", { params });
  console.log(response.data);
  return response;
};
