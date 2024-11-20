import React from "react";
import AuthorSkeleton from "./AuthorSkeleton";
import { Skeleton } from "@/components/ui/Skeleton";
import LikeAndCommentSkeleton from "./LikeAndCommentSkeleton";

const PostBoxSkeleton = () => {
  return (
    <>
      <div className="flex flex-col gap-[2rem] px-[1.5rem]">
        <AuthorSkeleton variant="board" />
        <Skeleton className="h-[2rem] w-[100%]" />
        <hr className="my-0" />
        <LikeAndCommentSkeleton />
      </div>
      <div className="mb-[1.5rem] mt-[2rem] h-[.6rem] w-full bg-gray-100"></div>
    </>
  );
};

export default PostBoxSkeleton;
