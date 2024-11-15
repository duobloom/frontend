import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { deletePostData } from "@/apis";

export const useDeletePostData = ({ page }: { page: boolean }) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation<AxiosResponse<string>, AxiosError, { type: "board" | "community"; id: string }>({
    mutationFn: async ({ type, id }) => await deletePostData(type, id),
    onSuccess: () => {
      if (page) {
        navigate(-1);
      } else {
        queryClient.invalidateQueries({
          queryKey: ["feed"],
        });
      }
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
