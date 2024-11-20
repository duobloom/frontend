import apiClient from "@/apis/axios";

export const getBoardDetailData = async (id: string) =>
  await apiClient.get(`${import.meta.env.VITE_APP_API_ENDPOINT}/api/feeds/boards/${id}`);
