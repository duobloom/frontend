import { z } from "zod";
import { AuthorSchema } from "./UserType";

// 감정 타입
export const EmotionSchema = z.object({
  emotionId: z.number(),
  emoji: z.number(),
  feedDate: z.string(),
  author: AuthorSchema.optional(),
});

export type EmotionType = z.infer<typeof EmotionSchema>;
