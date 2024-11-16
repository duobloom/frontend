import axios, { AxiosResponse } from "axios";

export const postScrap = async ({ type, postId }: { type: string; postId: number }): Promise<AxiosResponse> => {
  return type === "board"
    ? await axios.post(`/api/board-scrap/${postId}`)
    : await axios.post(`/api/community-scrap/${postId}`);
};

export const deleteScrap = async ({ type, postId }: { type: string; postId: number }): Promise<AxiosResponse> => {
  return type === "board"
    ? await axios.delete(`/api/board-scrap/${postId}`)
    : await axios.delete(`/api/community-scrap/${postId}`);
};
