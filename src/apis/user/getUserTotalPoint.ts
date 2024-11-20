import axios from "axios";

export const getUserTotalPoint = async () => await axios.get(`${import.meta.env.VITE_APP_API_ENDPOINT}/api/points`);
