import apiClient from "@/apis/axios";

export const postEmotion = async (emoji: { emoji: number }) =>
  await apiClient.post(`${import.meta.env.VITE_APP_API_ENDPOINT}/api/feeds/emotions`, emoji);
