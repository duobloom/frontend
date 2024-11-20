import axios from "axios";

export const deletePostData = async (type: string, id: string) => {
  return type === "board"
    ? await axios.delete(`${import.meta.env.VITE_APP_API_ENDPOINT}/api/feeds/boards/${id}`)
    : await axios.delete(`${import.meta.env.VITE_APP_API_ENDPOINT}/api/community/${id}`);
};
