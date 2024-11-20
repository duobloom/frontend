import axios from "axios";
import { LoginType } from "@/types";

export const postLogin = (loginInfo: LoginType) =>
  axios.post(`${import.meta.env.VITE_APP_API_ENDPOINT}/api/users/login`, loginInfo);
