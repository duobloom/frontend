import axios, { AxiosResponse } from "axios";

// board 좋아요 추가, community 좋아요 토글
export const postLike = async (type: string, id: number): Promise<AxiosResponse> => {
  return type === "board"
    ? await axios.post(`${import.meta.env.VITE_APP_API_ENDPOINT}/api/feeds/boards/${id}/like`)
    : await axios.post(`${import.meta.env.VITE_APP_API_ENDPOINT}/api/community/${id}/like`);
};

// board 좋아요 삭제
export const deleteBoardLike = async (id: number): Promise<AxiosResponse> => {
  return axios.delete(`${import.meta.env.VITE_APP_API_ENDPOINT}/api/feeds/boards/${id}/like`);
};
