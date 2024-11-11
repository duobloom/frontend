import axios from "axios";
import { BoardRequestType } from "@/types";

export const postBoardWrite = async (boardForm: BoardRequestType) => await axios.post("/api/feeds/boards", boardForm);
