// Tanstack-Query를 사용하지 않고 일반적인 fetch 진행 시 에러 처리를 할 때 쓰면 됩니다.
// 그 외에는 에러 전역 처리를 해놨기 때문에 사용하지 않아도 됩니다.

import { useCallback } from "react";
import { createErrorHandler } from "@/configs/errorHandler";

export const useErrorHandler = () => {
  const handleError = useCallback((error: unknown) => {
    const errorHandler = createErrorHandler();
    errorHandler(error);
  }, []);

  return { handleError };
};
