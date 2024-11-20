import { AxiosResponse } from "axios";
import apiClient from "@/apis/axios";

export const postScrap = async ({ type, postId }: { type: string; postId: number }): Promise<AxiosResponse> => {
  return type === "board"
    ? await apiClient.post(`${import.meta.env.VITE_APP_API_ENDPOINT}/api/board-scrap/${postId}`)
    : await apiClient.post(`${import.meta.env.VITE_APP_API_ENDPOINT}/api/community-scrap/${postId}`);
};

export const deleteScrap = async ({ type, postId }: { type: string; postId: number }): Promise<AxiosResponse> => {
  return type === "board"
    ? await apiClient.delete(`${import.meta.env.VITE_APP_API_ENDPOINT}/api/board-scrap/${postId}`)
    : await apiClient.delete(`${import.meta.env.VITE_APP_API_ENDPOINT}/api/community-scrap/${postId}`);
};
