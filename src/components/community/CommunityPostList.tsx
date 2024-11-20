import { useQuery } from "@tanstack/react-query";
import { CommunityBox } from "@/components/community";
import { getCommunityTypeList } from "@/apis";
import { useErrorHandler } from "@/hooks/useErrorHandler";
import { logValidationError, validateApiResponse } from "@/utils/zodHelpers";
import { CommunityListSchema, CommunityListType } from "@/types/CommunityType";
import { Skeleton } from "../ui/Skeleton";
import CommunityBoxSkeleton from "../skeleton/community/CommunityBoxSkeleton";

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
    gcTime: 0,
  });

  // 에러 처리
  if (error) {
    handleError(error);
    return <div>Error loading feed data</div>;
  }

  return (
    <article className="flex flex-col gap-[1rem]">
      {isLoading ? (
        <>
          <div>
            <Skeleton className="ml-[1.5rem] h-[2rem] w-[60%]" />
            <hr />
          </div>
          <div className="flex flex-col gap-[1.6rem] px-[1.5rem]">
            {Array.from(Array(10)).map((_, index) => (
              <CommunityBoxSkeleton key={index} />
            ))}
          </div>
        </>
      ) : (
        <>
          <div>
            <p className="px-[1.5rem] text-[1.4rem] font-medium leading-normal">
              {communityDataList?.length}개의 {name} 글
            </p>
            <hr />
          </div>
          {communityDataList
            ?.sort((a, b) => {
              return new Date(b.createdAt as string).getTime() - new Date(a.createdAt as string).getTime();
            })
            ?.map((communityData) => (
              <div key={communityData.communityId} className="flex flex-col gap-[1.5rem] px-[1.5rem]">
                <CommunityBox communityData={communityData} />
              </div>
            ))}
        </>
      )}
    </article>
  );
};

export default CommunityPostList;
