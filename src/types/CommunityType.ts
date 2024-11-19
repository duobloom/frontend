import { z } from "zod";

// 공통 타입 정의
const CategoryEnum = z.enum(["MENTAL", "MENTORING", "POLICY", "HOSPITAL", "FREE"]);
const DefaultArray = <T extends z.ZodTypeAny>(schema: T) => z.array(schema).default([]);

// 공통 스키마
const TagSchema = z.object({
  tagId: z.number(),
  name: z.string(),
});

const ImageSchema = z.object({
  imageId: z.number(),
  imageUrl: z.string(),
});

const CommentSchema = z.object({
  commentId: z.number(),
  content: z.string(),
  nickname: z.string(),
  profileUrl: z.string(),
  owner: z.boolean(),
});

const CommunityBaseSchema = z.object({
  communityId: z.number(),
  type: CategoryEnum,
  content: z.string(),
  nickname: z.string(),
  profilePictureUrl: z.string(),
  createdAt: z.string().optional(),
  updatedAt: z.string().nullable().optional(),
  commentCount: z.number().default(0),
  likeCount: z.number().default(0),
  likedByUser: z.boolean().default(false),
  owner: z.boolean().default(false),
  tags: DefaultArray(TagSchema),
});

// 스키마 정의
export const CommunitySchema = CommunityBaseSchema.extend({
  imageUrls: DefaultArray(z.string()),
});

export const CommunityDetailSchema = z.object({
  community: CommunityBaseSchema,
  images: DefaultArray(ImageSchema),
  comments: DefaultArray(CommentSchema),
  likeCount: z.number().default(0),
  tags: DefaultArray(TagSchema),
  owner: z.boolean().default(false),
  likedByUser: z.boolean().default(false),
});

export const CommunityPostFormSchema = z.object({
  type: CategoryEnum,
  content: z.string().min(1, "내용을 입력해주세요"),
  tags: DefaultArray(z.string()),
  images: DefaultArray(
    z.object({
      photo_url: z.string(),
      file: z.instanceof(File).optional(),
    }),
  ),
});

export const CommunityRequestSchema = z.object({
  type: CategoryEnum,
  imageUrls: DefaultArray(z.string()),
  content: z.string(),
  tags: DefaultArray(z.string()),
});

export const CommunityListSchema = z.array(CommunitySchema);

// 타입 정의
export type CommunityType = z.infer<typeof CommunitySchema>;
export type CommunityListType = z.infer<typeof CommunityListSchema>;
export type CommunityPostFormType = z.infer<typeof CommunityPostFormSchema>;
export type CategoryType = z.infer<typeof CategoryEnum>;
export type CommunityRequestType = z.infer<typeof CommunityRequestSchema>;
export type CommunityDetailType = z.infer<typeof CommunityDetailSchema>;
export type CommunityCommentType = z.infer<typeof CommentSchema>;
