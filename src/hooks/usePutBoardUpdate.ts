import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { putBoardUpdate } from "@/apis";
import { BoardRequestType } from "@/types";
import { useToast } from "@/libs/custom-toast";

export const usePutBoardUpdate = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation<AxiosResponse<string>, AxiosError, { id: number; boardForm: BoardRequestType }>({
    mutationFn: async ({ id, boardForm }) => await putBoardUpdate(id, boardForm),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["feed"],
      });
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
      toast.info("피드 수정이 완료 되었습니다.", 3000);
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
