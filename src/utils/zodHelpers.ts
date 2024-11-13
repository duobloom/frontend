import { z } from "zod";
import { AxiosResponse } from "axios";

// zod 스키마의 타입을 추론하기 위한 타입
type SchemaType<T extends z.ZodType> = z.infer<T>;

// 유효성 검사 에러를 위한 커스텀 에러 클래스
export class ValidationError extends Error {
  constructor(
    message: string,
    public errors: z.ZodError["errors"],
    public data?: unknown,
  ) {
    super(message);
    this.name = "ValidationError";
  }
}

// 데이터 유효성 검사를 위한 헬퍼 함수
export const validateData = <T extends z.ZodType>(
  schema: T, // 검증할 zod 스키마
  data: unknown, // 검증할 데이터
  errorMessage = "데이터 유효성 검사 실패", // 기본 에러 메시지
): SchemaType<T> => {
  const result = schema.safeParse(data);

  if (!result.success) {
    throw new ValidationError(errorMessage, result.error.errors, data);
  }

  return result.data;
};

// API 응답 데이터 검증을 위한 헬퍼 함수
export const validateApiResponse = <T extends z.ZodType>(
  response: AxiosResponse, // axios 응답 객체
  schema: T, // 검증할 zod 스키마 (response zod 스키마)
  errorMessage?: string, // 에러 메시지 (선택)
): SchemaType<T> => {
  return validateData(schema, response.data, errorMessage);
};

// 개발 환경에서 유효성 검사 에러 로깅을 위한 헬퍼 함수
export const logValidationError = (error: unknown) => {
  if (process.env.NODE_ENV === "development" && error instanceof ValidationError) {
    console.group("유효성 검사 에러");
    console.error("메시지:", error.message);
    console.error("상세 에러:", error.errors);
    console.error("잘못된 데이터:", error.data);
    console.groupEnd();
  }
};
