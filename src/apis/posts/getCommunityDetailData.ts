import axios from "axios";

export const getCommunityDetailData = async (id: string) => await axios.get(`/api/community/${id}`);
