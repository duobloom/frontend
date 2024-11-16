import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { postLike, deleteBoardLike } from "@/apis";

export const usePostLike = () => {
  const queryClient = useQueryClient();

  return useMutation<AxiosResponse, AxiosError, { type: "board" | "community"; id: number }>({
    mutationFn: async ({ type, id }) => await postLike(type, id),
    onSuccess: () => {
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

export const useDeleteBoardLike = () => {
  const queryClient = useQueryClient();

  return useMutation<AxiosResponse, AxiosError, { id: number }>({
    mutationFn: ({ id }) => deleteBoardLike(id),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({
        queryKey: ["post", id], // 더 구체적으로 invalidate
      });
    },
    onError: (error) => {
      if (error.response?.status === 401) {
        console.log("로그인이 필요합니다."); // 사용자 알림 추가
      } else {
        console.log(`오류가 발생했습니다: ${error.message}`);
      }
    },
  });
};
