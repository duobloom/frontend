import apiClient from "@/apis/axios";

// 커뮤니티 타입별 게시글 전체 조회
export const getCommunityTypeList = async (type: string) => {
  return await apiClient.get(`${import.meta.env.VITE_APP_API_ENDPOINT}/api/community/type/${type}`);
};
