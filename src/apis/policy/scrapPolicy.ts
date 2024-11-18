import { PolicyListType } from "@/types";
import { validateApiResponse } from "@/utils/zodHelpers";
import { z } from "zod";
import apiClient from "../axios";
import { PolicyListSchema } from "@/types/PolicyType";

export const getScrapPolicy = async () => {
  const response = await apiClient.get<PolicyListType[]>("/api/policy-scrap");
  return validateApiResponse(response, PolicyListSchema.array(), "policy 스크랩 데이터 검증 실패");
};

export const postScrapPolicy = async (policyId?: number) => {
  const response = await apiClient.post<string>(`/api/policy-scrap/${policyId}`);
  return validateApiResponse(response, z.string());
};

export const deleteScrapPolicy = async (policyId?: number) => {
  const response = await apiClient.delete<string>(`/api/policy-scrap/${policyId}`);
  return validateApiResponse(response, z.string());
};
