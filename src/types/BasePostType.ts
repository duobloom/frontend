import { z } from "zod";
import { CommentSchema } from "./CommentType";

export const BasePostSchema = z.object({
  authorNickname: z.string(),
  authorProfilePictureUrl: z.string(),
  mine: z.boolean().default(false),
  content: z.string(),
  photoUrls: z.array(z.string().url()).optional().default([]),
  createdAt: z.string().optional(),
  updatedAt: z.string(),
  comments: z.array(CommentSchema).optional().default([]),
  likeCount: z.number().default(0),
  commentCount: z.number().default(0),
});

export type BasePostType = z.infer<typeof BasePostSchema>;
