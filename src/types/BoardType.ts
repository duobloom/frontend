import { z } from "zod";
import { BasePostSchema, ImageSchema } from "./BasePostType";

export const BoardSchema = BasePostSchema.extend({
  board_id: z.number(),
});

export const BoardPostFormSchema = z.object({
  content: z.string().min(1, "내용을 입력해주세요"),
  images: z.array(ImageSchema).optional().default([]),
});

export type BoardType = z.infer<typeof BoardSchema>;
export type BoardPostFormType = z.infer<typeof BoardPostFormSchema>;
