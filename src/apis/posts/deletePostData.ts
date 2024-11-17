import axios from "axios";

export const deletePostData = async (type: string, id: string) => {
  return type === "board" ? await axios.delete(`/api/feeds/boards/${id}`) : await axios.delete(`/api/community/${id}`);
};
