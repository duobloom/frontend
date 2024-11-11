import { z } from "zod";
import { BasePostSchema } from "./BasePostType";

export const BoardSchema = BasePostSchema.extend({
  boardId: z.number(),
});

// Form 타입
export const BoardPostFormSchema = z.object({
  title: z.string().optional(),
  content: z.string().min(1, "내용을 입력해주세요"),
  photoUrls: z.array(
    z.object({
      photo_url: z.string(),
      file: z.instanceof(File).optional(),
    }),
  ),
});

// api request 타입
export const BoardRequestSchema = z.object({
  content: z.string(),
  photoUrls: z.array(z.string()).optional().default([]),
});

export type BoardType = z.infer<typeof BoardSchema>;
export type BoardPostFormType = z.infer<typeof BoardPostFormSchema>;
export type BoardRequestType = z.infer<typeof BoardRequestSchema>;
