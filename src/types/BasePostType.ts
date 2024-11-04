import { z } from "zod";
import { AuthorSchema } from "./UserType";
import { CommentSchema } from "./CommentType";

// 이미지 타입 정의
export const ImageSchema = z.object({
  url: z.string().url(),
  alt: z.string().optional(),
});

export const BasePostSchema = z.object({
  author: AuthorSchema,
  content: z.string(),
  images: z.array(ImageSchema).optional().default([]),
  createdAt: z.string().datetime(),
  likes: z.number().default(0),
  comments: z.array(CommentSchema),
});

export type BasePostType = z.infer<typeof BasePostSchema>;
