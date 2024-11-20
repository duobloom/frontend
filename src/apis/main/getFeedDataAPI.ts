import apiClient from "@/apis/axios";

export const getFeedData = async (date: string) => await apiClient.get(`/api/feeds/${date}`);
