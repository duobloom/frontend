import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { postBoardWrite } from "@/apis/main/postBoardWrite";
import { BoardRequestType } from "@/types";

export const usePostBoardWrite = () => {
  // const queryClient = useQueryClient();

  return useMutation<AxiosResponse<string>, AxiosError, BoardRequestType>({
    mutationFn: async (boardForm) => await postBoardWrite(boardForm),
    onSuccess: (response) => {
      console.log(response.data);
      // 캐시 초기화
      // queryClient.invalidateQueries({
      //   queryKey: ["feed"],
      // });
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
