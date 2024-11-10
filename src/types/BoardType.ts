import { z } from "zod";
import { BasePostSchema } from "./BasePostType";

export const BoardSchema = BasePostSchema.extend({
  boardId: z.number(),
});

export const BoardPostFormSchema = z.object({
  content: z.string().min(1, "내용을 입력해주세요"),
  photoUrls: z.array(z.string().url()).optional().default([]),
});

export type BoardType = z.infer<typeof BoardSchema>;
export type BoardPostFormType = z.infer<typeof BoardPostFormSchema>;
