import apiClient from "@/apis/axios";
import { CommunityRequestType } from "@/types";

export const postCommunityWrite = async (postForm: CommunityRequestType) =>
  await apiClient.post(`${import.meta.env.VITE_APP_API_ENDPOINT}/api/community`, postForm);
