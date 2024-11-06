import { z } from "zod";

export const AuthorSchema = z.object({
  user_id: z.number().int(),
  name: z.string(),
  birth: z.string().optional(),
  balance: z.number().default(0),
  couple_user_id: z.number().int(),
  profileImage: z.string().optional(),
});

export const UserSchema = z.object({
  author: AuthorSchema,
  email: z.string().email("올바른 이메일 형식이 아닙니다"),
  region: z.string(),
});

export type UserProfileType = z.infer<typeof AuthorSchema>;
export type UserType = z.infer<typeof UserSchema>;
