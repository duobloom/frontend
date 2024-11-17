import { z } from "zod";

// 피드 타입 정의
export const CommentSchema = z.object({
  id: z.number(),
  nickname: z.string(),
  profilePictureUrl: z.string(),
  content: z.string(),
  createdAt: z.string(),
  mine: z.boolean().default(false),
});

// Response 타입 예시
export type CommentType = z.infer<typeof CommentSchema>;
