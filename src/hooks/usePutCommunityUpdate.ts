import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { putCommunityUpdate } from "@/apis";
import { CommunityRequestType } from "@/types";

export const usePutCommunityUpdate = () => {
  const queryClient = useQueryClient();

  return useMutation<AxiosResponse<string>, AxiosError, { id: number; communityForm: CommunityRequestType }>({
    mutationFn: async ({ id, communityForm }) => await putCommunityUpdate(id, communityForm),
    onSuccess: (_, { id, communityForm }) => {
      queryClient.invalidateQueries({
        queryKey: ["community", communityForm.type],
      });
      queryClient.invalidateQueries({
        queryKey: ["community", id],
      });
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
