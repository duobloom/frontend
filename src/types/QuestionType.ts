import { z } from "zod";
import { AuthorSchema } from "./UserType";

// 답변 스키마 정의
export const AnswerSchema = z.object({
  answer_id: z.number(),
  content: z.string(),
  question_id: z.number(),
  updated_at: z.string().datetime(),
  author: AuthorSchema,
});
// 질문 스키마 정의
export const QuestionSchema = z.object({
  question_id: z.number(),
  content: z.string(),
  answers: z.array(AnswerSchema).optional().default([]),
});

export type QuestionType = z.infer<typeof QuestionSchema>;
export type AnswerType = z.infer<typeof AnswerSchema>;
