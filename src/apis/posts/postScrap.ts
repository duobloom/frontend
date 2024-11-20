import axios, { AxiosResponse } from "axios";

export const postScrap = async ({ type, postId }: { type: string; postId: number }): Promise<AxiosResponse> => {
  return type === "board"
    ? await axios.post(`${import.meta.env.VITE_APP_API_ENDPOINT}/api/board-scrap/${postId}`)
    : await axios.post(`${import.meta.env.VITE_APP_API_ENDPOINT}/api/community-scrap/${postId}`);
};

export const deleteScrap = async ({ type, postId }: { type: string; postId: number }): Promise<AxiosResponse> => {
  return type === "board"
    ? await axios.delete(`${import.meta.env.VITE_APP_API_ENDPOINT}/api/board-scrap/${postId}`)
    : await axios.delete(`${import.meta.env.VITE_APP_API_ENDPOINT}/api/community-scrap/${postId}`);
};
