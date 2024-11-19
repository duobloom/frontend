import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { PostDetailBox, CommentBox, CommentInput } from "@/components/common";
import { getCommunityDetailData } from "@/apis";
import { useErrorHandler } from "@/hooks/useErrorHandler";
import { logValidationError, validateApiResponse } from "@/utils/zodHelpers";
import { CommunityDetailSchema, CommunityDetailType } from "@/types/CommunityType";
import { CommunityPostHeader } from "@/components/community";

// 커뮤니티, 피드에서 상세 글로 둘 다 접근
const CommunityDetailPage = () => {
  const location = useLocation();
  const [type, id] = location.pathname.slice(1).split("/") as ["community", string];
  const { handleError } = useErrorHandler();

  const {
    data: postData,
    isLoading,
    error,
  } = useQuery<CommunityDetailType, Error>({
    queryKey: ["community", id],
    queryFn: async () => {
      try {
        const response = await getCommunityDetailData(id);
        return validateApiResponse(response, CommunityDetailSchema);
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
        <></>
      ) : (
        <>
          <CommunityPostHeader postData={postData as CommunityDetailType} variant="community" id={id} />
          <div className="h-[calc(100vh-138px)] overflow-y-auto scrollbar-hide">
            <PostDetailBox postData={postData as CommunityDetailType} variant={type} id={id} />
            <CommentBox commentData={postData?.comments ?? []} type={type} />
          </div>
          <CommentInput type={type} id={id} />
        </>
      )}
    </main>
  );
};

export default CommunityDetailPage;
