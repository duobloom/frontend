import { z } from "zod";
import { AuthorSchema } from "./UserType";

// 감정 타입
export const EmotionSchema = z.object({
  emotion_id: z.number(),
  emotion_num: z.number(),
  updated_at: z.string().datetime(),
  author: AuthorSchema,
});

export type EmotionType = z.infer<typeof EmotionSchema>;
