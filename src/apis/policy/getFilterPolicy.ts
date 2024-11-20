import { PolicyListType } from "@/types";
import apiClient from "@/apis/axios";

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

  const response = await apiClient.get<PolicyListType[]>(
    `${import.meta.env.VITE_APP_API_ENDPOINT}/api/policies/filter`,
    {
      params,
    },
  );
  console.log(response.data);
  return response;
};
