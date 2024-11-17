import axios from "axios";

export const postEmotion = async (emoji: { emoji: number }) => await axios.post("/api/feeds/emotions", emoji);
