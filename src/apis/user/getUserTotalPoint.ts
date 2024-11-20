import apiClient from "@/apis/axios";

export const getUserTotalPoint = async () => await apiClient.get(`${import.meta.env.VITE_APP_API_ENDPOINT}/api/points`);
