import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { postCommunityWrite } from "@/apis";
import { CommunityRequestType } from "@/types";

export const usePostCommunityWrite = () => {
  const queryClient = useQueryClient();

  return useMutation<AxiosResponse<string>, AxiosError, CommunityRequestType>({
    mutationFn: async (postForm) => await postCommunityWrite(postForm),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["community"],
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
