import { z } from "zod";

const PolicyKeywordSchema = z.object({
  keyword: z.string(),
});

// 정책 전체 타입
export const PolicySchema = z.object({
  policy_id: z.number(),
  policy_name: z.string(),
  policy_img: z.string(),
  host: z.string(),
  target: z.string(),
  category: z.string(),
  start_date: z.string(),
  end_date: z.string(),
  benefit: z.string(),
  content: z.string(),
  keywordMappings: z.array(PolicyKeywordSchema),
});

// 정책 리스트 타입
export const PolicyListSchema = z.object({
  policyId: z.number(),
  policyName: z.string(),
  linkUrl: z.string().nullable(),
  policyHost: z.string(),
  target: z.string().nullable(),
  region: z.number().nullable(),
  middle: z.number().nullable(),
  detail: z.number().nullable(),
  keyword: z.string(),
});

export type PolicyType = z.infer<typeof PolicySchema>;
export type PolicyListType = z.infer<typeof PolicyListSchema>;
