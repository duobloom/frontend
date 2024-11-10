import { z } from "zod";
import { EmotionSchema } from "./EmotionType";

export const BoardListSchema = z.object({
  feedDate: z.string(),
  userEmotion: EmotionSchema,
  coupleEmotion: EmotionSchema,
  userBoards: 
});

export type BoardListType = z.infer<typeof BoardListSchema>;
