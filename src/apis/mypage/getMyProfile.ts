import { UserType } from "@/types";
import axios from "axios";

export const getMyProfile = async () => {
  const response = await axios.get<UserType>("/api/users/profile");
  console.log(response.data);
  return response;
};
