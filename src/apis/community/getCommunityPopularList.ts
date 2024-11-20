import axios from "axios";

// 커뮤니티 타입별 인기 게시글 조회
export const getCommunityPopularList = async () =>
  await axios.get(`${import.meta.env.VITE_APP_API_ENDPOINT}/api/community/top-by-type`);
