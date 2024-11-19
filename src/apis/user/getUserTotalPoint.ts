import axios from "axios";

export const getUserTotalPoint = async () => await axios.get(`/api/points`);
