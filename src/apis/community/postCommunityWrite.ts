import axios from "axios";
import { CommunityRequestType } from "@/types";

export const postCommunityWrite = async (postForm: CommunityRequestType) =>
  await axios.post("/api/community", postForm);
