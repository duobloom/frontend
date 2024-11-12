import { z } from "zod";

// 감정 타입
export const EmotionSchema = z.object({
  emotionId: z.number(),
  emoji: z.number(),
  feedDate: z.string(),
  createdAt: z.string(),
  authorNickname: z.string(),
  authorProfilePictureUrl: z.string(),
  mine: z.boolean().default(false),
});

export type EmotionType = z.infer<typeof EmotionSchema>;
