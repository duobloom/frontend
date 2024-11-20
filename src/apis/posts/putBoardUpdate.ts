import axios from "axios";
import { BoardRequestType } from "@/types";

export const putBoardUpdate = async (id: number, boardForm: BoardRequestType) =>
  await axios.put(`${import.meta.env.VITE_APP_API_ENDPOINT}/api/feeds/boards/${id}`, boardForm);
