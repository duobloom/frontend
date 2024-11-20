import apiClient from "@/apis/axios";

export const getFeedData = async (date: string) =>
  await apiClient.get(`${import.meta.env.VITE_APP_API_ENDPOINT}/api/feeds/${date}`);
