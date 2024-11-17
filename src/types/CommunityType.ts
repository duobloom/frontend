import { z } from "zod";

const tagSchema = z.object({
  tagId: z.number(),
  name: z.string(),
});

export const CommunitySchema = z.object({
  communityId: z.number(),
  type: z.enum(["MENTAL", "MENTORING", "POLICY", "HOSPITAL", "FREE"]),
  content: z.string(),
  nickname: z.string(),
  profilePictureUrl: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  imageUrls: z.array(z.string()).default([]),
  likeCount: z.number(),
  likedByUser: z.boolean().default(false),
  commentCount: z.number(),
  owner: z.boolean().default(false),
  tags: z.array(tagSchema).default([]),
});

export const CommunityPostFormSchema = z.object({
  type: z.enum(["MENTAL", "MENTORING", "POLICY", "HOSPITAL", "FREE"]),
  content: z.string().min(1, "내용을 입력해주세요"),
  tags: z.array(tagSchema).default([]),
  photoUrls: z.array(
    z.object({
      photo_url: z.string(),
      file: z.instanceof(File).optional(),
    }),
  ),
});

export const CommunityListSchema = z.array(CommunitySchema);

export type CommunityType = z.infer<typeof CommunitySchema>;
export type CommunityListType = z.infer<typeof CommunityListSchema>;
export type CommunityPostFormType = z.infer<typeof CommunityPostFormSchema>;
export type CategoryType = "MENTAL" | "MENTORING" | "POLICY" | "HOSPITAL" | "FREE";
