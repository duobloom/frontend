import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { postBoardWrite } from "@/apis/main/postBoardWriteAPI";
import { BoardRequestType } from "@/types";

export const usePostBoardWrite = () => {
  const queryClient = useQueryClient();

  return useMutation<string, AxiosError, BoardRequestType>({
    mutationFn: postBoardWrite,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["feed"],
      });
    },
  });
};
