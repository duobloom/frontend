import { UserType } from "@/types";
import axios from "axios";

export const getMyProfile = async () => {
  const response = await axios.get<UserType>(`${import.meta.env.VITE_APP_API_ENDPOINT}/api/users/profile`);
  console.log(response.data);
  return response;
};
