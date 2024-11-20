import { Skeleton } from "@/components/ui/Skeleton";
import AuthorSkeleton from "./AuthorSkeleton";

const CommentBoxSkeleton = () => {
  return (
    <div className="flex w-full flex-col gap-[.5rem] px-[1.5rem]">
      <div className="flex items-center justify-between">
        <AuthorSkeleton />
        <Skeleton className="h-[2rem] w-[3rem]" />
      </div>
      <Skeleton className="ml-[4.4rem] h-[2rem] w-[87%]" />
    </div>
  );
};

export default CommentBoxSkeleton;
