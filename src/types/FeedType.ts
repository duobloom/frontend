import { z } from "zod";
import { QuestionSchema } from "./QuestionType";
import { BoardSchema } from "./BoardType";
import { EmotionSchema } from "./EmotionType";
import { AuthorSchema } from "./UserType";

// api response 타입
export const FeedResponseSchema = z.object({
  feedDate: z.string(),
  userProfile: AuthorSchema,
  coupleProfile: AuthorSchema,
  userEmotions: z.array(EmotionSchema).optional().default([]),
  coupleEmotions: z.array(EmotionSchema).optional().default([]),
  userBoards: z.array(BoardSchema).optional().default([]),
  coupleBoards: z.array(BoardSchema).optional().default([]),
  questionsWithAnswers: z.array(QuestionSchema).optional().default([]),
});

// feed에서 프로필 데이터 스키마 추출
export const ProfilesSchema = FeedResponseSchema.transform((data) => ({
  userProfile: data.userProfile,
  coupleProfile: data.coupleProfile,
}));

export type FeedResponseType = z.infer<typeof FeedResponseSchema>;
export type ProfilesType = z.infer<typeof ProfilesSchema>;
