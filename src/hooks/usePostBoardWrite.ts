import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { postBoardWrite } from "@/apis/main/postBoardWriteAPI";
import { BoardRequestType } from "@/types";
import { useToast } from "@/libs/custom-toast";

export const usePostBoardWrite = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation<AxiosResponse<string>, AxiosError, BoardRequestType>({
    mutationFn: async (boardForm) => await postBoardWrite(boardForm),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["feed"],
      });
      toast.info("피드 작성이 완료 되었습니다.", 3000);
    },
    onError: (error) => {
      if (error.response?.status === 401) {
        console.error("로그인이 필요합니다.");
        toast.info("로그인이 필요합니다.", 3000);
      } else {
        console.error("업로드 중 오류가 발생했습니다:", error.message);
        toast.info("피드 업로드 중 오류가 발생했습니다", 3000);
      }
    },
  });
};
