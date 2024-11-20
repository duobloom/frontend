import axios from "axios";

export const getCommunityDetailData = async (id: string) =>
  await axios.get(`${import.meta.env.VITE_APP_API_ENDPOINT}/api/community/${id}`);
