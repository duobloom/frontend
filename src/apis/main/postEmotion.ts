import axios from "axios";

export const postEmotion = async (emoji: { emoji: number }) =>
  await axios.post(`${import.meta.env.VITE_APP_API_ENDPOINT}/api/feeds/emotions`, emoji);
