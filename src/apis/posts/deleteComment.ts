import axios from "axios";

export const deleteComment = async (type: string, id: number) => {
  return type === "board"
    ? await axios.delete(`${import.meta.env.VITE_APP_API_ENDPOINT}/api/feeds/boards/comments/${id}`)
    : await axios.delete(`${import.meta.env.VITE_APP_API_ENDPOINT}/api/community/comments/${id}`);
};
