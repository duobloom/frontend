import axios from "axios";
import { CommunityRequestType } from "@/types";

export const putCommunityUpdate = async (id: number, communityForm: CommunityRequestType) =>
  await axios.put(`/api/community/${id}`, communityForm);
