import { Skeleton } from "@/components/ui/Skeleton";

const LikeAndCommentSkeleton = () => {
  return (
    <div className="flex gap-[1.6rem]">
      {/* 좋아요 버튼 스켈레톤 */}
      <div className="flex items-center gap-[0.4rem]">
        <Skeleton className="h-[2rem] w-[2rem] rounded-full" />
        <Skeleton className="h-[1.4rem] w-[2rem]" />
      </div>

      {/* 댓글 버튼 스켈레톤 */}
      <div className="flex items-center gap-[0.4rem]">
        <Skeleton className="h-[2rem] w-[2rem] rounded-full" />
        <Skeleton className="h-[1.4rem] w-[2rem]" />
      </div>
    </div>
  );
};

export default LikeAndCommentSkeleton;
