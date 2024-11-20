import axios from "axios";
import { BoardRequestType } from "@/types";

export const postBoardWrite = async (boardForm: BoardRequestType) =>
  await axios.post(`${import.meta.env.VITE_APP_API_ENDPOINT}/api/feeds/boards`, boardForm);
