import { UserType } from "@/types";
import apiClient from "../axios";
import { UserSchema } from "@/types/UserType";
import { validateApiResponse } from "@/utils/zodHelpers";

export const getMyProfile = async (): Promise<UserType> => {
  const response = await apiClient.get<UserType>("/api/users/profile");
  return validateApiResponse(response, UserSchema, "유저 프로필 데이터 검증 실패");
};
