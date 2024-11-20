import apiClient from "@/apis/axios";
import { CommunityRequestType } from "@/types";

export const putCommunityUpdate = async (id: number, communityForm: CommunityRequestType) =>
  await apiClient.put(`${import.meta.env.VITE_APP_API_ENDPOINT}/api/community/${id}`, communityForm);
