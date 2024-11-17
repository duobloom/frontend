import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { PostDetailBox, CommentBox, CommentInput } from "@/components/common";
import { PostHeader } from "@/components/common";
import { getBoardDetailData, getCommunityDetailData } from "@/apis";
import { useErrorHandler } from "@/hooks/useErrorHandler";
import { logValidationError, validateApiResponse } from "@/utils/zodHelpers";
import { BoardType, BoardSchema } from "@/types/BoardType";
import { CommunityDetailSchema, CommunityDetailType } from "@/types/CommunityType";
import { PostBoxType } from "@/types/BasePostType";

// 커뮤니티, 피드에서 상세 글로 둘 다 접근
const PostDetailPage = () => {
  const location = useLocation();
  const [type, id] = location.pathname.slice(1).split("/") as ["board" | "community", string];
  const { handleError } = useErrorHandler();

  const {
    data: postData,
    isLoading,
    error,
  } = useQuery<BoardType | CommunityDetailType, Error>({
    queryKey: ["posts", id],
    queryFn: async () => {
      try {
        const response = type === "board" ? await getBoardDetailData(id) : await getCommunityDetailData(id);

        const schema = type === "board" ? BoardSchema : CommunityDetailSchema;
        return validateApiResponse(response, schema);
      } catch (error) {
        logValidationError(error);
        throw error;
      }
    },
    enabled: !!id,
  });

  // 에러 처리
  if (error) {
    handleError(error);
    return <div>Error loading feed data</div>;
  }

  return (
    <main>
      {isLoading ? (
        <>로딩중</>
      ) : (
        <>
          <PostHeader
            postData={type === "board" ? (postData as BoardType) : (postData as CommunityDetailType)}
            variant={type}
            id={id}
          />
          <div className="h-[calc(100vh-138px)] overflow-y-auto scrollbar-hide">
            <PostDetailBox postData={postData as PostBoxType} variant={type} id={id} />
            <CommentBox commentData={postData?.comments ?? []} type={type} />
          </div>
          <CommentInput type={type} id={id} />
        </>
      )}
    </main>
  );
};

export default PostDetailPage;
