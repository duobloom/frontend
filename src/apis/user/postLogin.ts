import axios from "axios";
import { LoginType } from "@/types";

export const postLogin = (loginInfo: LoginType) => axios.post("https://api.duo-bloom.com/api/users/login", loginInfo);
