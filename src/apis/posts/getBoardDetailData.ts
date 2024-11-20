import axios from "axios";

export const getBoardDetailData = async (id: string) =>
  await axios.get(`${import.meta.env.VITE_APP_API_ENDPOINT}/api/feeds/boards/${id}`);
