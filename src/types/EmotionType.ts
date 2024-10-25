import { z } from "zod";

// 이모지 타입 enum DB 정해지면 수정
//const EmojiEnum = z.enum(["😊"]); // 이모지 종류를 정의 (실제 DB의 ENUM 값에 맞게 수정)

const AuthorSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  profileImage: z.string().url().optional(),
});
// 감정 타입
export const EmotionSchema = z.object({
  emotion_id: z.number(),
  //emoji: EmojiEnum,
  content: z.string(),
  updated_at: z.string().datetime(),
  user: AuthorSchema,
});

export type EmotionType = z.infer<typeof EmotionSchema>;
