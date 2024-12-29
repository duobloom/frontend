import { useCallback } from "react";
import * as Sentry from "@sentry/react";
import { ValidationError } from "@/utils/zodHelpers";

// 에러 처리를 위한 커스텀 훅
export const useErrorHandler = () => {
  const handleError = useCallback((error: unknown) => {
    if (error instanceof ValidationError) {
      // 유효성 검사 에러 처리
      Sentry.captureException(error);
      console.error("유효성 검사 실패:", error.message);
    } else if (error instanceof Error) {
      // 일반적인 에러 처리
      Sentry.captureException(error);
      console.error("에러 발생:", error.message);
    } else {
      // 알 수 없는 에러 처리
      Sentry.captureException(error);
      console.error("알 수 없는 에러:", error);
    }
  }, []);
  return { handleError };
};
