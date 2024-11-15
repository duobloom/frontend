import axios from "axios";

export const getBoardDetailData = async (id: string) => await axios.get(`/api/feeds/boards/${id}`);
