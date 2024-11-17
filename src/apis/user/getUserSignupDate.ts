import axios from "axios";

export const getUserSignupDate = async () => await axios.get(`/api/users/calendar`);
