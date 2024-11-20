import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { PostDetailBox, CommentBox, CommentInput } from "@/components/common";
import { MainBoardHeader } from "@/components/main";
import { getBoardDetailData } from "@/apis";
import { useErrorHandler } from "@/hooks/useErrorHandler";
import { logValidationError, validateApiResponse } from "@/utils/zodHelpers";
import { BoardType, BoardSchema } from "@/types/BoardType";
import { PostBoxType } from "@/types/BasePostType";
import DetailPageSkeleton from "@/components/skeleton/detail/DetailPageSkeleton";

// 피드에서 상세 글 접근
const BoardDetailPage = () => {
  const location = useLocation();
  const [type, id] = location.pathname.slice(1).split("/") as ["board", string];
  const { handleError } = useErrorHandler();

  const {
    data: postData,
    isLoading,
    error,
  } = useQuery<BoardType, Error>({
    queryKey: ["posts", id],
    queryFn: async () => {
      try {
        const response = await getBoardDetailData(id);
        return validateApiResponse(response, BoardSchema);
      } catch (error) {
        logValidationError(error);
        throw error;
      }
    },
    enabled: !!id,
    gcTime: 0,
  });

  // 에러 처리
  if (error) {
    handleError(error);
    return <div>Error loading feed data</div>;
  }

  return (
    <main>
      {isLoading ? (
        <DetailPageSkeleton />
      ) : (
        <>
          <MainBoardHeader
            content={postData?.content as string}
            photoUrls={postData?.photoUrls as string[]}
            mine={postData?.mine as boolean}
            variant={type}
            id={id}
          />
          <div className="h-[calc(100dvh-13.8rem)] overflow-y-auto scrollbar-hide">
            <PostDetailBox postData={postData as PostBoxType} variant={type} id={id} />
            <CommentBox commentData={postData?.comments ?? []} type={type} />
          </div>
          <CommentInput type={type} id={id} />
        </>
      )}
    </main>
  );
};

export default BoardDetailPage;
