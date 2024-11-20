import axios from "axios";

export const getUserSignupDate = async () =>
  await axios.get(`${import.meta.env.VITE_APP_API_ENDPOINT}/api/users/calendar`);
