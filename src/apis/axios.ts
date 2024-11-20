import axios from "axios";
import { AuthenticationError, NetworkError, NotFoundError, ServerError } from "./errors";

// 네비게이션을 위한 전역 함수 설정
let navigateFunction: ((path: string) => void) | null = null;

export const setNavigateFunction = (navigate: (path: string) => void) => {
  navigateFunction = navigate;
};

const apiClient = axios.create({
  withCredentials: true,
  baseURL: "https://api.duo-bloom.com",
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // 서버로부터 응답이 있는 경우
    if (error.response) {
      const { status } = error.response;

      switch (status) {
        case 401:
          // 로그인 페이지로 리다이렉트
          if (navigateFunction) {
            navigateFunction("/login");
          }
          throw new AuthenticationError("로그인 해주시기 바랍니다.");
        case 404:
          throw new NotFoundError("찾을 수 없습니다.");
        case 500:
          throw new ServerError("서버 에러가 발생했습니다.");
        default:
          if (status >= 500) {
            throw new ServerError("예기치 않은 서버 에러가 발생했습니다.");
          }
      }
    }
    // 네트워크 에러 (서버에 요청이 도달하지 못한 경우)
    else if (error.request) {
      throw new NetworkError("네트워크 연결에 실패했습니다.");
    }
    // 그 외의 에러
    throw error;
  },
);

export default apiClient;
