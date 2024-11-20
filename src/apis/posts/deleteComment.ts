import apiClient from "@/apis/axios";

export const deleteComment = async (type: string, id: number) => {
  return type === "board"
    ? await apiClient.delete(`${import.meta.env.VITE_APP_API_ENDPOINT}/api/feeds/boards/comments/${id}`)
    : await apiClient.delete(`${import.meta.env.VITE_APP_API_ENDPOINT}/api/community/comments/${id}`);
};
