import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { postScrap, deleteScrap } from "@/apis";

export const usePostScrap = () => {
  return useMutation<AxiosResponse, AxiosError, { type: "board" | "community"; postId: number }>({
    mutationFn: async ({ type, postId }) => await postScrap({ type, postId }),
    onSuccess: () => {},
    onError: (error) => {
      if (error.response?.status === 401) {
        console.error("로그인이 필요합니다.");
      } else {
        console.error("업로드 중 오류가 발생했습니다:", error.message);
      }
    },
  });
};

export const useDeleteBoardLike = () => {
  return useMutation<AxiosResponse, AxiosError, { type: "board" | "community"; postId: number }>({
    mutationFn: async ({ type, postId }) => await deleteScrap({ type, postId }),
    onSuccess: () => {},
    onError: (error) => {
      if (error.response?.status === 401) {
        console.log("로그인이 필요합니다."); // 사용자 알림 추가
      } else {
        console.log(`오류가 발생했습니다: ${error.message}`);
      }
    },
  });
};
