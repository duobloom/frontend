import { z } from "zod";

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

// 작성자 정보 타입 정의
const AuthorSchema = z.object({
  id: z.string(),
  name: z.string(),
  profileImage: z.string().url().optional(),
});

// 태그 타입 정의
const TagSchema = z.object({
  id: z.string(),
  name: z.string(),
});

// 게시글 타입 정의
export const PostSchema = z.object({
  id: z.string(),
  author: AuthorSchema,
  category: CategorySchema,
  content: z.string(),
  images: z.array(ImageSchema).optional().default([]),
  tags: z.array(TagSchema),
  createdAt: z.string().datetime(),
  likes: z.number().default(0),
  comments: z.number().default(0),
});

// Response 타입 예시
export type PostType = z.infer<typeof PostSchema>;
