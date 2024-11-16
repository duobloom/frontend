import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { putBoardUpdate } from "@/apis";
import { BoardRequestType } from "@/types";

export const usePutBoardUpdate = () => {
  const queryClient = useQueryClient();

  return useMutation<AxiosResponse<string>, AxiosError, { id: number; boardForm: BoardRequestType }>({
    mutationFn: async ({ id, boardForm }) => await putBoardUpdate(id, boardForm),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["feed"],
      });
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
    },
    onError: (error) => {
      if (error.response?.status === 401) {
        console.error("로그인이 필요합니다.");
      } else {
        console.error("업로드 중 오류가 발생했습니다:", error.message);
      }
    },
  });
};
