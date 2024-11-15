import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { deleteComment } from "@/apis";

export const useDeleteComment = () => {
  const queryClient = useQueryClient();

  return useMutation<AxiosResponse<string>, AxiosError, { type: "board" | "community"; id: number }>({
    mutationFn: async ({ type, id }) => await deleteComment(type, id),
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
