import { z } from "zod";
import { QuestionSchema } from "./QuestionType";
import { BoardSchema } from "./BoardType";
import { EmotionSchema } from "./EmotionType";

// api response 타입
export const FeedResponseSchema = z.object({
  feedDate: z.string(),
  userEmotion: z.array(EmotionSchema).optional().default([]),
  coupleEmotion: z.array(EmotionSchema).optional().default([]),
  userBoards: z.array(BoardSchema).optional().default([]),
  coupleBoards: z.array(BoardSchema).optional().default([]),
  questionsWithAnswers: z.array(QuestionSchema).optional().default([]),
});

export type FeedResponseType = z.infer<typeof FeedResponseSchema>;
