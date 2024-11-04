import { z } from "zod";

export const PointSchema = z.object({
  transaction_id: z.number().int(),
  amount: z.number().int(),
  transaction_type: z.enum(["ANSWER", "CHALLENGE_REWARD"]),
  created_at: z.string().datetime(),
  balance: z.number(),
  user_id: z.number().int(),
});

export type PointType = z.infer<typeof PointSchema>;
