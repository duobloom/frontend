import { z } from "zod";
import { BasePostSchema } from "./BasePostType";

// 카테고리 enum 정의 (DB 타입 보고 수정할 예정)
// const MainCategoryEnum = z.enum(["자유", "난임", "정책", "병원/클리닉"]);
// const SubCategoryEnum = z.enum(["소통", "시험관", "시술 후기", "자연 임신"]);

// 카테고리 타입 정의
const CategorySchema = z.object({
  main: z.string(),
});

// 태그 타입 정의
const TagSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export const CommunitySchema = BasePostSchema.extend({
  community_id: z.number(),
  category: CategorySchema,
  tags: z.array(TagSchema),
});

export type CommunityType = z.infer<typeof CommunitySchema>;
