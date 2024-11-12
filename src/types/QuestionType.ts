import { z } from "zod";

// 답변 스키마 정의
export const AnswerSchema = z.object({
  answerId: z.number(),
  questionId: z.number(),
  content: z.string(),
  updatedAt: z.string(),
  createdAt: z.string(),
  nickname: z.string(),
  profilePictureUrl: z.string(),
  mine: z.boolean().default(false),
});

// 질문 스키마 정의
export const QuestionSchema = z.object({
  questionId: z.number(),
  content: z.string(),
  myAnswerStatus: z.boolean().default(false),
  coupleAnswerStatus: z.boolean().default(false),
  answers: z.array(AnswerSchema).optional().default([]),
});

export type QuestionType = z.infer<typeof QuestionSchema>;
export type AnswerType = z.infer<typeof AnswerSchema>;
