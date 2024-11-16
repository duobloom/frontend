import axios from "axios";

export const deleteComment = async (type: string, id: number) => {
  return type === "board"
    ? await axios.delete(`/api/feeds/boards/comments/${id}`)
    : await axios.delete(`/api/community/comments/${id}`);
};
