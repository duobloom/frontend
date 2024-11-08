import { z } from "zod";
import { BasePostSchema, ImageSchema } from "./BasePostType";

export const FeedSchema = BasePostSchema.extend({
  feed_id: z.number(),
});

export const FeedPostFormSchema = z.object({
  content: z.string().min(1, "내용을 입력해주세요"),
  images: z.array(ImageSchema).optional().default([]),
});

export type FeedType = z.infer<typeof FeedSchema>;
export type FeedPostFormType = z.infer<typeof FeedPostFormSchema>;
