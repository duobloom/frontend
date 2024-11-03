import { z } from "zod";
import { AuthorSchema } from "./UserType";

// 피드 타입 정의
export const CommentSchema = z.object({
  comment_id: z.number(),
  author: AuthorSchema,
  content: z.string(),
  createdAt: z.string(),
});

// Response 타입 예시
export type CommentType = z.infer<typeof CommentSchema>;
