import { z } from "zod";

const PolicyKeywordSchema = z.object({
  keyword: z.string(),
});

const PolicyTargetSchema = z.object({
  benefit: z.union([z.string(), z.array(z.string())]), // 문자열 또는 배열 허용
  target: z.union([z.string(), z.array(z.string())]),
  type: z.union([z.string(), z.array(z.string())]),
});

const PolicyBenefitSchema = z.object({
  info: z.array(z.string()),
  method: z.object({
    type: z.string().optional(),
    details: z.array(z.string()).optional(),
    application: z
      .object({
        online: z.string().optional(),
      })
      .optional(),
    onlineApplication: z.string().optional(),
    requiredDocuments: z.array(z.string()).optional(),
  }),
  target: z.union([z.string(), z.array(z.string())]),
  content: z.string(),
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
  target: PolicyTargetSchema.nullable(),
  benefit: PolicyBenefitSchema.nullable(),
  linkUrl: z.string(),
  imageUrl: z.string().nullable(),
  scraped: z.boolean(),
  keywordMappings: z.array(PolicyKeywordSchema).nullable(),
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
  keywordMappings: z.array(PolicyKeywordSchema).nullable(),
});

export type PolicyType = z.infer<typeof PolicySchema>;
export type PolicyListType = z.infer<typeof PolicyListSchema>;
