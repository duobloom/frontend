import { UserType } from "@/types";
import apiClient from "@/apis/axios";

export const getMyProfile = async () => {
  const response = await apiClient.get<UserType>(`${import.meta.env.VITE_APP_API_ENDPOINT}/api/users/profile`);
  console.log(response.data);
  return response;
};
