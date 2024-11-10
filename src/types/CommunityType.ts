import { z } from "zod";
import { BasePostSchema } from "./BasePostType";

export const CommunitySchema = BasePostSchema.extend({
  community_id: z.number(),
  type: z.enum(["심리케어", "멘토링", "정책", "병원/클리닉", "자유"]),
  tags: z.array(z.string()),
});

export const CommunityPostFormSchema = z.object({
  type: z.enum(["심리케어", "멘토링", "정책", "병원/클리닉", "자유"]),
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
export type CategoryType = "심리케어" | "멘토링" | "정책" | "병원/클리닉" | "자유";
