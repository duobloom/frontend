import { useQuery } from "@tanstack/react-query";
import { CommunityBox } from "@/components/common";
import { getCommunityTypeList } from "@/apis";
import { useErrorHandler } from "@/hooks/useErrorHandler";
import { logValidationError, validateApiResponse } from "@/utils/zodHelpers";
import { CommunityListSchema, CommunityListType } from "@/types/CommunityType";

type TCommunityPostListProps = {
  name: string;
  type: string;
};

const CommunityPostList = ({ name, type }: TCommunityPostListProps) => {
  const { handleError } = useErrorHandler();

  const {
    data: communityDataList,
    isLoading,
    error,
  } = useQuery<CommunityListType, Error>({
    queryKey: ["community", type],
    queryFn: async () => {
      try {
        const response = await getCommunityTypeList(type);
        return validateApiResponse(response, CommunityListSchema);
      } catch (error) {
        logValidationError(error);
        throw error;
      }
    },
  });

  // 에러 처리
  if (error) {
    handleError(error);
    return <div>Error loading feed data</div>;
  }

  return (
    <article className="flex flex-col gap-[1rem]">
      {isLoading ? (
        <>로딩 중...</>
      ) : (
        <>
          <div>
            <p className="px-[1.5rem] text-[1.4rem] font-medium leading-normal">
              {communityDataList?.length}개의 {name} 글
            </p>
            <hr />
          </div>
          {communityDataList?.map((communityData) => (
            <div className="flex flex-col gap-[1.5rem] px-[1.5rem]">
              <CommunityBox communityData={communityData} />
            </div>
          ))}
        </>
      )}
    </article>
  );
};

export default CommunityPostList;
