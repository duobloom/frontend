import apiClient from "@/apis/axios";
import { LoginType } from "@/types";

export const postLogin = (loginInfo: LoginType) =>
  apiClient.post(`${import.meta.env.VITE_APP_API_ENDPOINT}/api/users/login`, loginInfo);
