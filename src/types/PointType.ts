import { z } from "zod";

export const PointSchema = z.object({
  transactionId: z.number().int(),
  amount: z.number().int(),
  transactionType: z.enum(["ANSWER", "CHALLENGE_REWARD"]),
  createdAt: z.string(),
  balance: z.number(),
  mine: z.boolean().default(true),
});

export type PointType = z.infer<typeof PointSchema>;
