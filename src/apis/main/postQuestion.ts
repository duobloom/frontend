import axios from "axios";

export type RequestBodyType = {
  questionId: number;
  content: string;
};
export const postQuestion = async (body: RequestBodyType) => await axios.post("/api/feeds/answer", body);
