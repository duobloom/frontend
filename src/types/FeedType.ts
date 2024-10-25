import { z } from "zod";

// 이미지 타입 정의
const ImageSchema = z.object({
  url: z.string().url(),
  alt: z.string().optional(),
});

// 작성자 정보 타입 정의
const AuthorSchema = z.object({
  id: z.string(),
  name: z.string(),
  profileImage: z.string().url().optional(),
});

// 피드 타입 정의
export const FeedSchema = z.object({
  id: z.string(),
  author: AuthorSchema,
  content: z.string(),
  images: z.array(ImageSchema).optional().default([]),
  createdAt: z.string().datetime(),
  likes: z.number().default(0),
  comments: z.number().default(0),
});

// Response 타입 예시
export type FeedType = z.infer<typeof FeedSchema>;
