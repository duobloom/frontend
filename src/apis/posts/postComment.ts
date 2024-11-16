import axios from "axios";

export const postComment = async ({ postId, text }: { postId: string; text: string }) =>
  await axios.post(`/api/feeds/boards/${postId}/comments`, text);
