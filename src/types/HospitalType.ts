import { z } from "zod";

const HospitalKeywordSchema = z.object({
  keyword: z.string(),
});

//병원 전체 타입
export const HospitalSchema = z.object({
  hospitalId: z.number(), // 병원 ID
  hospitalName: z.string(), // 병원 이름
  region: z.string().nullable(), // 상위 지역 코드
  middle: z.string().nullable(), // 시/군 단위 코드
  detail: z.string().nullable(), // 구/읍/면 단위 코드
  type: z.string().nullable(), // 병원 종류
  address: z.string().nullable(), // 병원 주소
  phone: z.string().nullable(), // 병원 전화번호
  time: z.string().nullable(), // 진료시간
  hospitalInfo: z.string().nullable(), // 병원 정보
  staffInfo: z.string().nullable(), // 의료진 정보
  latitude: z.number().nullable(), // 위도
  longitude: z.number().nullable(), // 경도
  imageUrl: z.string().nullable(), // 이미지 링크 URL
  linkUrl: z.string().nullable(), //
  keywordMappings: z.array(HospitalKeywordSchema).optional(), // 키워드 정보
});

//병원 리스트 타입
export const HospitalListSchema = z.object({
  hospitalId: z.number(), // 병원 ID
  hospitalName: z.string(), // 병원 이름
  region: z.string().nullable(), // 상위 지역 코드
  middle: z.string().nullable(), // 시/군 단위 코드
  detail: z.string().nullable(), // 구/읍/면 단위 코드
  type: z.string().nullable(), // 병원 종류
  time: z.string().nullable(), // 진료시간
  latitude: z.number().nullable(), // 위도
  longitude: z.number().nullable(), // 경도
  imageUrl: z.string().nullable(), // 이미지 링크 URL
  keywordMappings: z.array(HospitalKeywordSchema).optional(), // 키워드 정보
});

export type HospitalType = z.infer<typeof HospitalSchema>;
export type HospitalListType = z.infer<typeof HospitalListSchema>;
