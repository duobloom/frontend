import axios from "axios";
import { BoardRequestType } from "@/types";

export const putBoardUpdate = async (id: number, boardForm: BoardRequestType) =>
  await axios.put(`/api/feeds/boards/${id}`, boardForm);
