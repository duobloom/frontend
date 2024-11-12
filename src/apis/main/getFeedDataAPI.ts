import axios from "axios";

export const getFeedData = async (date: string) => await axios.get(`/api/feeds/${date}`);
