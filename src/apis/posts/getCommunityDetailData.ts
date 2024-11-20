import apiClient from "@/apis/axios";

export const getCommunityDetailData = async (id: string) =>
  await apiClient.get(`${import.meta.env.VITE_APP_API_ENDPOINT}/api/community/${id}`);
