import { z } from "zod";

// 유저 스키마 정의
const AuthorSchema = z.object({
  id: z.number(),
  name: z.string(),
  profileImage: z.string().url().optional(),
});

// 답변 스키마 정의
export const AnswerSchema = z.object({
  answer_id: z.number(),
  content: z.string(),
  question_id: z.number(),
  updated_at: z.string().datetime(),
  user: AuthorSchema,
});
// 질문 스키마 정의
export const QuestionSchema = z.object({
  question_id: z.number(),
  content: z.string(),
  answers: z.array(AnswerSchema).optional().default([]),
});

export type QuestionType = z.infer<typeof QuestionSchema>;
export type AnswerType = z.infer<typeof AnswerSchema>;
