import { PolicyListType } from "@/types";
import axios from "axios";

export const getSearchPolicy = async (keyword?: string) => {
  const response = await axios.get<PolicyListType[]>(`/api/policies/search?name=${keyword}`);
  console.log(response.data);
  return response;
};
