import apiClient from "@/apis/axios";

export type RequestBodyType = {
  questionId: number;
  content: string;
};
export const postQuestion = async (body: RequestBodyType) =>
  await apiClient.post(`${import.meta.env.VITE_APP_API_ENDPOINT}/api/feeds/answer`, body);
