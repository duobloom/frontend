import { ValidationError } from "@/utils/zodHelpers";
import { AuthenticationError, ServerError, NotFoundError, NetworkError } from "@/apis/errors";

// 기본 에러 핸들러 (네비게이션 없이)
export const createErrorHandler = () => (error: unknown) => {
  // 로그인 오류 (401)
  if (error instanceof AuthenticationError) {
    console.error("인증 오류 - 로그인 해주시기 바랍니다.", error.message);
    window.location.href = "/login";
  }
  // 찾을 수 없는 오류 (404)
  else if (error instanceof NotFoundError) {
    console.error("리소스를 찾을 수 없습니다:", error.message);
  }
  // 서버 에러 (500)
  else if (error instanceof ServerError) {
    console.error("서버 에러가 발생했습니다:", error.message);
  }
  // 네트워크 오류
  else if (error instanceof NetworkError) {
    console.error("네트워크 연결을 확인해주세요");
  }
  // 유효성 검사 에러
  else if (error instanceof ValidationError) {
    console.error("유효성 검사 실패:", error);
  }
  // 일반적인 에러
  else if (error instanceof Error) {
    console.error("에러 발생:", error.message);
  }
  // 알 수 없는 에러
  else {
    console.error("알 수 없는 에러:", error);
  }
};
