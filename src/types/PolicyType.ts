import { z } from "zod";

const PolicyKeywordSchema = z.object({
  keyword: z.string(),
});

// 정책 전체 타입
export const PolicySchema = z.object({
  policyId: z.number(),
  policyName: z.string(),
  policyHost: z.string(),
  region: z.string().nullable(),
  middle: z.string().nullable(),
  detail: z.string().nullable(),
  startDate: z.string().nullable(),
  endDate: z.string().nullable(),
  target: z.string().nullable(),
  linkUrl: z.string(),
  imageUrl: z.string().nullable(),
  scraped: z.boolean(),
  keywordMappings: z.array(PolicyKeywordSchema),
});

// 정책 리스트 타입
export const PolicyListSchema = z.object({
  policyId: z.number(),
  policyName: z.string(),
  policyHost: z.string(),
  region: z.string().nullable(),
  middle: z.string().nullable(),
  detail: z.string().nullable(),
  startDate: z.string().nullable(),
  endDate: z.string().nullable(),
  imageUrl: z.string().nullable(),
  scraped: z.boolean(),
  keywordMappings: z.array(PolicyKeywordSchema),
});

export type PolicyType = z.infer<typeof PolicySchema>;
export type PolicyListType = z.infer<typeof PolicyListSchema>;
