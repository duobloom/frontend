import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import { patchMyProfile } from "@/apis";
import { PatchUserSchema, PatchUserType } from "@/types/UserType";
import { logValidationError, ValidationError } from "@/utils/zodHelpers";

export const useUpdateProfile = () => {
  const navigate = useNavigate();

  return useMutation<AxiosResponse<string>, Error, PatchUserType>({
    mutationFn: async (data: PatchUserType) => {
      const validationResult = PatchUserSchema.safeParse(data);
      if (!validationResult.success) {
        logValidationError(validationResult.error);
        throw new ValidationError("입력 데이터 유효성 검사 실패", validationResult.error.errors, data);
      }
      return patchMyProfile(validationResult.data);
    },
    onError: (error) => {
      if (error instanceof ValidationError) {
        console.error("유효성 검사 에러:", error.errors);
      } else if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          console.error("인증 오류: 로그인 페이지로 이동합니다.");
          navigate("/login");
        } else {
          console.error("서버 요청 에러:", error.response?.data || error.message);
        }
      } else {
        console.error("기타 에러:", error.message);
      }
    },
  });
};
