import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email("올바른 이메일 형식이 아닙니다"),
  password: z.string(),
});

export type LoginType = z.infer<typeof LoginSchema>;
