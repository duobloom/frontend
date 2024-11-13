import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { patchMyProfile } from "@/apis";
import { PatchUserType } from "@/types/UserType";

export const useUpdateProfile = () => {
  return useMutation<AxiosResponse<string>, AxiosError, PatchUserType>({
    mutationFn: patchMyProfile,
    onError: (error) => {
      if (error.response?.status === 400) {
        console.error("입력 데이터가 올바르지 않습니다.");
      } else {
        console.error("프로필 업데이트 중 오류가 발생했습니다:", error.message);
      }
    },
  });
};
