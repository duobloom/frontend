import { z } from "zod";
import { BasePostSchema, ImageSchema } from "./BasePostType";

export const FeedSchema = BasePostSchema.extend({
  feed_id: z.number(),
});

export const FeedPostSchema = z.object({
  feed_id: z.number(),
  content: z.string(),
  images: z.array(ImageSchema).optional().default([]),
});

export type FeedType = z.infer<typeof FeedSchema>;
export type FeedPostType = z.infer<typeof FeedPostSchema>;
