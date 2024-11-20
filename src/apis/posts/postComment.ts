import { AxiosResponse } from "axios";
import apiClient from "@/apis/axios";

export const postComment = async ({
  type,
  postId,
  text,
}: {
  type: string;
  postId: string;
  text: string;
}): Promise<AxiosResponse> => {
  return type === "board"
    ? await apiClient.post(`${import.meta.env.VITE_APP_API_ENDPOINT}/api/feeds/boards/${postId}/comments`, {
        content: text,
      })
    : await apiClient.post(`${import.meta.env.VITE_APP_API_ENDPOINT}/api/community/${postId}/comments`, {
        content: text,
      });
};
