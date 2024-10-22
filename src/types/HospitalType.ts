import { z } from "zod";

const HospitalKeywordSchema = z.object({
  keyword_id: z.number(),
  keyword_name: z.string(),
});

export const HospitalSchema = z.object({
  hospital_id: z.number(),
  hospital_name: z.string(),
  hospital_type: z.string(), // 병원 종류,
  hospital_img: z.string(), // 병원 이미지
  start_date: z.string().nullable(), // (시작 시간)
  end_date: z.string().nullable(), // (종료 시간)
  lat: z.string().nullable(), // 위도
  lon: z.string().nullable(), // 경도 (내 위치와 병원 사이의 거리를 나타내기 위해 사용)
  location: z.string().nullable(), // 병원 위치
  isClosed: z.boolean().nullable(), // 휴무
  isCert: z.boolean().nullable(), // 병원 인증 여부
  keywords: z.array(HospitalKeywordSchema),
});

export type HospitalType = z.infer<typeof HospitalSchema>;
