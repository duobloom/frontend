import axios from "axios";

export type RequestBodyType = {
  questionId: number;
  content: string;
};
export const postQuestion = async (body: RequestBodyType) =>
  await axios.post(`${import.meta.env.VITE_APP_API_ENDPOINT}/api/feeds/answer`, body);
