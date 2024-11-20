import apiClient from "@/apis/axios";
import { BoardRequestType } from "@/types";

export const postBoardWrite = async (boardForm: BoardRequestType) =>
  await apiClient.post(`${import.meta.env.VITE_APP_API_ENDPOINT}/api/feeds/boards`, boardForm);
