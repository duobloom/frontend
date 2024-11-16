import { z } from "zod";
import { BasePostSchema } from "./BasePostType";

export const CommunitySchema = BasePostSchema.extend({
  communityId: z.number(),
  type: z.enum(["mental", "mentoring", "policy", "hospital", "free"]),
  tags: z.array(z.string()),
});

export const CommunityPostFormSchema = z.object({
  type: z.enum(["mental", "mentoring", "policy", "hospital", "free"]),
  content: z.string().min(1, "내용을 입력해주세요"),
  tags: z.array(z.string()).default([]),
  photoUrls: z.array(
    z.object({
      photo_url: z.string(),
      file: z.instanceof(File).optional(),
    }),
  ),
});

export type CommunityType = z.infer<typeof CommunitySchema>;
export type CommunityPostFormType = z.infer<typeof CommunityPostFormSchema>;
export type CategoryType = "mental" | "mentoring" | "policy" | "hospital" | "free";
