import axios from "axios";
import { CommunityRequestType } from "@/types";

export const postCommunityWrite = async (postForm: CommunityRequestType) =>
  await axios.post(`${import.meta.env.VITE_APP_API_ENDPOINT}/api/community`, postForm);
