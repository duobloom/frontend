import { useNavigate } from "react-router-dom";
import { IconComments, IconHeart } from "@/assets/icon";
import { useState } from "react";

type TLikeAndComments = {
  type: "community" | "board";
  id: number;
  likeCount: number;
  commentCount: number;
};

const LikeAndComments = ({ type, id, likeCount, commentCount }: TLikeAndComments) => {
  const navigate = useNavigate();

  const [isLiked, setIsLiked] = useState(false); // 좋아요 클릭 여부 (서버에서 누른적 있는지 체크 하고 진행)
  const [likeCountNum, setLikeCountNum] = useState(likeCount); // 현재 좋아요 개수

  const handleLikeClick = () => {
    setIsLiked((prev) => !prev); // 클릭 시 상태 반전
    setLikeCountNum((prev) => (isLiked ? prev - 1 : prev + 1)); // 상태에 따라 증가/감소
  };

  return (
    <div className="flex gap-[1.6rem]">
      <div className="flex cursor-pointer items-center gap-[0.4rem] text-gray-500" onClick={handleLikeClick}>
        <IconHeart className={`${isLiked ? "stroke-red" : "stroke-gray-500"}`} />
        <span className="text-[1.4rem]">{String(likeCountNum)}</span>
      </div>
      <div
        className="flex cursor-pointer items-center gap-[0.4rem] text-gray-500"
        onClick={() => navigate(`${type === "board" ? `/board/${id}` : `/community/${id}`}`)}
      >
        <IconComments />
        <span className="text-[1.4rem]">{String(commentCount)}</span>
      </div>
    </div>
  );
};

export default LikeAndComments;
