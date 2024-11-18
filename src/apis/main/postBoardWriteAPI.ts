import { z } from "zod";
import apiClient from "@/apis/axios";
import { validateApiResponse } from "@/utils/zodHelpers";
import { BoardRequestType } from "@/types";

export const postBoardWrite = async (boardForm: BoardRequestType): Promise<string> => {
  const response = await apiClient.post<string>("/api/feeds/boards", boardForm);
  return validateApiResponse(response, z.string());
};
