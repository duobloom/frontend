import { z } from "zod";

export const AuthorSchema = z.object({
  userId: z.number().int(),
  nickname: z.string(),
  birth: z.string().optional(),
  balance: z.number().default(0).optional(),
  coupleBalance: z.number().default(0).optional(),
  coupleUserId: z.number().int().optional(),
  profilePictureUrl: z.string().optional(),
});

export const UserSchema = z.object({
  nickname: z.string().max(12),
  birth: z.string().optional(),
  balance: z.number().default(0).optional(),
  coupleBalance: z.number().default(0).optional(),
  coupleUserId: z.number().int().optional(),
  profilePictureUrl: z.string().optional(),
  email: z.string().email("올바른 이메일 형식이 아닙니다"),
  region: z.string().nullable(),
});

export const PatchUserSchema = z.object({
  nickname: z.string().max(12),
  birth: z.string().optional(),
  profilePictureUrl: z.string().optional(),
  email: z.string().email("올바른 이메일 형식이 아닙니다"),
  region: z.string().nullable(),
});

export type UserProfileType = z.infer<typeof AuthorSchema>;
export type UserType = z.infer<typeof UserSchema>;
export type PatchUserType = z.infer<typeof PatchUserSchema>;
