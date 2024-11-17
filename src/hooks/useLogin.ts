import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { postLogin } from "@/apis/user/postLogin";
import { LoginType } from "@/types";

export const useLogin = () => {
  const navigate = useNavigate();

  return useMutation<AxiosResponse<string>, AxiosError, LoginType>({
    mutationFn: postLogin,
    onSuccess: (response) => {
      console.log(response.data);
      navigate("/");
    },
    onError: (error) => {
      if (error.response?.status === 401) {
        console.error("이메일 또는 비밀번호가 올바르지 않습니다.");
      } else {
        console.error("로그인 중 오류가 발생했습니다:", error.message);
      }
    },
  });
};
