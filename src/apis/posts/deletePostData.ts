import apiClient from "@/apis/axios";

export const deletePostData = async (type: string, id: string) => {
  return type === "board"
    ? await apiClient.delete(`${import.meta.env.VITE_APP_API_ENDPOINT}/api/feeds/boards/${id}`)
    : await apiClient.delete(`${import.meta.env.VITE_APP_API_ENDPOINT}/api/community/${id}`);
};
