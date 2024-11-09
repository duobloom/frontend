import axios from "axios";
import { LoginType } from "@/types";

export const postLogin = (loginInfo: LoginType) => axios.post("/api/users/login", loginInfo);
