import React from "react";
import { useQuery } from "@tanstack/react-query";
import { CommunityTitle } from "@/components/community";
import { CommunityBox } from "@/components/community";
import { getCommunityPopularList } from "@/apis";
import { useErrorHandler } from "@/hooks/useErrorHandler";
import { logValidationError, validateApiResponse } from "@/utils/zodHelpers";
import { CommunityListSchema, CommunityListType } from "@/types/CommunityType";
import { filterList } from "@/constants";

const CommunityPopularList = ({
  setSelectedButton,
}: {
  setSelectedButton: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const { handleError } = useErrorHandler();

  const {
    data: communityPopularList,
    isLoading,
    error,
  } = useQuery<CommunityListType, Error>({
    queryKey: ["community"],
    queryFn: async () => {
      try {
        const response = await getCommunityPopularList();
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

  const moveFilter = (id: number) => {
    setSelectedButton(id);
  };

  const groupByCategory = (data: CommunityListType): Record<string, typeof data> => {
    return filterList.slice(1).reduce(
      (acc, filterItem) => {
        const categoryName = filterItem.name;
        acc[categoryName] = data.filter((item) => item.type === filterItem.type);
        return acc;
      },
      {} as Record<string, typeof data>,
    );
  };

  return (
    <section className="flex flex-col gap-[2.6rem]">
      {isLoading ? (
        <></>
      ) : (
        <>
          {communityPopularList &&
            filterList.slice(1).map((filterItem) => {
              const communityPopularData = groupByCategory(communityPopularList)[filterItem.name] || [];

              return (
                <article key={filterItem.id} className="flex flex-col gap-[1rem]">
                  <div onClick={() => moveFilter(filterItem.id)}>
                    <CommunityTitle title={`${filterItem.name} 인기 글`} />
                  </div>
                  <div className="flex flex-col gap-[1.6rem]">
                    {communityPopularData.map((communityData) => (
                      <div key={communityData.communityId} className="flex flex-col gap-[1.5rem] px-[1.5rem]">
                        <CommunityBox communityData={communityData} />
                      </div>
                    ))}
                  </div>
                </article>
              );
            })}
        </>
      )}
    </section>
  );
};

export default CommunityPopularList;
