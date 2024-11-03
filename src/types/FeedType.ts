import { z } from "zod";
import { AuthorSchema } from "./UserType";
import { CommentSchema } from "./CommentType";

// 이미지 타입 정의
const ImageSchema = z.object({
  url: z.string().url(),
  alt: z.string().optional(),
});

// 피드 타입 정의
export const FeedSchema = z.object({
  feed_id: z.number(),
  author: AuthorSchema,
  content: z.string(),
  images: z.array(ImageSchema).optional().default([]),
  createdAt: z.string().datetime(),
  likes: z.number().default(0),
  comments: z.array(CommentSchema),
});

export const FeedPostSchema = z.object({
  feed_id: z.number(),
  content: z.string(),
  images: z.array(ImageSchema).optional().default([]),
});

// Response 타입 예시
export type FeedType = z.infer<typeof FeedSchema>;
export type FeedPostType = z.infer<typeof FeedPostSchema>;
