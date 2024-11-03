import { z } from "zod";
import { AuthorSchema } from "./UserType";
import { CommentSchema } from "./CommentType";

// 카테고리 enum 정의 (DB 타입 보고 수정할 예정)
// const MainCategoryEnum = z.enum(["자유", "난임", "정책", "병원/클리닉"]);
// const SubCategoryEnum = z.enum(["소통", "시험관", "시술 후기", "자연 임신"]);

// 카테고리 타입 정의
const CategorySchema = z.object({
  // main: MainCategoryEnum,
  // sub: SubCategoryEnum,
  main: z.string(),
  sub: z.string(),
});

// 이미지 타입 정의
const ImageSchema = z.object({
  url: z.string().url(),
  alt: z.string().optional(),
});

// 태그 타입 정의
const TagSchema = z.object({
  id: z.string(),
  name: z.string(),
});

// 게시글 타입 정의
export const PostSchema = z.object({
  post_id: z.number(),
  author: AuthorSchema,
  category: CategorySchema,
  content: z.string(),
  images: z.array(ImageSchema).optional().default([]),
  tags: z.array(TagSchema),
  createdAt: z.string().datetime(),
  likes: z.number().default(0),
  comments: z.array(CommentSchema),
});

export type PostType = z.infer<typeof PostSchema>;
