import axios from "axios";
import { CommunityRequestType } from "@/types";

export const putCommunityUpdate = async (id: number, communityForm: CommunityRequestType) =>
  await axios.put(`${import.meta.env.VITE_APP_API_ENDPOINT}/api/community/${id}`, communityForm);
