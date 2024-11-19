import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/utils";
import { IconComments, IconHeart } from "@/assets/icon";
import { useDeleteBoardLike, usePostLike } from "@/hooks/usePostLike";

type TLikeAndComments = {
  type: "community" | "board";
  isDetailPage?: boolean;
  id: string;
  likeCount: number;
  commentCount: number;
  likedByUser: boolean;
};

const LikeAndComments = ({ type, isDetailPage, id, likeCount, commentCount, likedByUser }: TLikeAndComments) => {
  const navigate = useNavigate();
  const postLike = usePostLike();
  const deleteBoardLike = useDeleteBoardLike();

  const [isLiked, setIsLiked] = useState(likedByUser); // 좋아요 클릭 여부 (서버에서 누른적 있는지 체크 하고 진행)
  const [likeCountNum, setLikeCountNum] = useState(likeCount); // 현재 좋아요 개수

  const handleLikeClick = () => {
    const newIsLiked = !isLiked;
    setIsLiked(newIsLiked);
    setLikeCountNum((prev) => (newIsLiked ? prev + 1 : prev - 1));

    // 좋아요 상태에 따라 API 호출
    if (newIsLiked) {
      postLike.mutate(
        { type, id: Number(id) },
        {
          onError: () => {
            setIsLiked(!newIsLiked); // 상태 복구
            setLikeCountNum((prev) => (newIsLiked ? prev - 1 : prev + 1));
            console.error("좋아요 처리에 실패했습니다.");
          },
        },
      );
    } else {
      if (type === "community") {
        postLike.mutate(
          { type, id: Number(id) },
          {
            onError: () => {
              setIsLiked(!newIsLiked); // 상태 복구
              setLikeCountNum((prev) => (newIsLiked ? prev - 1 : prev + 1));
              console.error("좋아요 처리에 실패했습니다.");
            },
          },
        );
      } else {
        deleteBoardLike.mutate(
          { id: Number(id) },
          {
            onError: () => {
              setIsLiked(!newIsLiked); // 상태 복구
              setLikeCountNum((prev) => (newIsLiked ? prev - 1 : prev + 1));
              console.error("좋아요 취소에 실패했습니다.");
            },
          },
        );
      }
    }
  };

  const moveLink = () => {
    // 상세 페이지가 아닐 경우
    if (!isDetailPage) {
      navigate(type === "board" ? `/board/${id}` : `/community/${id}`);
    }
  };

  return (
    <div className="flex gap-[1.6rem]">
      <div className="flex cursor-pointer items-center gap-[0.4rem] text-gray-500" onClick={handleLikeClick}>
        <IconHeart className={`${isLiked ? "stroke-red" : "stroke-gray-500"}`} />
        <span className="text-[1.4rem]">{likeCountNum}</span>
      </div>
      <div
        className={cn(`flex items-center gap-[0.4rem] text-gray-500`, isDetailPage || "cursor-pointer")}
        onClick={moveLink}
      >
        <IconComments />
        <span className="text-[1.4rem]">{commentCount}</span>
      </div>
    </div>
  );
};

export default LikeAndComments;
