import axios, { AxiosResponse } from "axios";

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
    ? await axios.post(`/api/feeds/boards/${postId}/comments`, { content: text })
    : await axios.post(`/api/community/${postId}/comments`, { content: text });
};
