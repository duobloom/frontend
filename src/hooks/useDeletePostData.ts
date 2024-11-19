import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { deletePostData } from "@/apis";
import { useToast } from "@/libs/custom-toast";

export const useDeletePostData = ({ page }: { page: boolean }) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const toast = useToast();

  return useMutation<AxiosResponse<string>, AxiosError, { type: "board" | "community"; id: string }>({
    mutationFn: async ({ type, id }) => await deletePostData(type, id),
    onSuccess: () => {
      if (page) {
        navigate(-1);
      } else {
        queryClient.invalidateQueries({
          queryKey: ["feed"],
        });
        toast.success("피드 삭제가 완료되었습니다", 3000);
      }
    },
    onError: (error) => {
      if (error.response?.status === 401) {
        console.error("로그인이 필요합니다.");
        toast.error("로그인 해주시기 바랍니다.", 3000);
      } else {
        console.error("업로드 중 오류가 발생했습니다:", error.message);
        toast.error("피드 삭제 중 오류가 발생했습니다.", 3000);
      }
    },
  });
};
