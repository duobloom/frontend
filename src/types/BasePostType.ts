import { z } from "zod";
import { AuthorSchema } from "./UserType";
import { CommentSchema } from "./CommentType";

export const BasePostSchema = z.object({
  author: AuthorSchema,
  content: z.string(),
  photoUrls: z.array(z.string().url()).optional().default([]),
  createdAt: z.string().datetime().optional(),
  updatedAt: z.string().datetime(),
  likes: z.number().default(0),
  comments: z.array(CommentSchema),
});

export type BasePostType = z.infer<typeof BasePostSchema>;
