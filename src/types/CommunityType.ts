import { z } from "zod";
import { BasePostSchema } from "./BasePostType";

export const CommunitySchema = BasePostSchema.extend({
  community_id: z.number(),
  category: z.enum(["심리케어", "멘토링", "정책", "병원/클리닉", "자유"]),
  tags: z.array(z.string()),
});

export const CommunityPostFormSchema = z.object({
  category: z.enum(["심리케어", "멘토링", "정책", "병원/클리닉", "자유"]),
  content: z.string().min(1, "내용을 입력해주세요"),
  photoUrls: z.array(z.string().url()).optional().default([]),
  tags: z.array(z.string()).default([]),
});

export type CommunityType = z.infer<typeof CommunitySchema>;
export type CommunityPostFormType = z.infer<typeof CommunityPostFormSchema>;
export type CategoryType = "심리케어" | "멘토링" | "정책" | "병원/클리닉" | "자유";
