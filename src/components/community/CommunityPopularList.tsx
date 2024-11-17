import React from "react";
import { useQuery } from "@tanstack/react-query";
import { CommunityTitle } from "@/components/community";
import { CommunityBox } from "@/components/common";
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
  });

  // 에러 처리
  if (error) {
    handleError(error);
    return <div>Error loading feed data</div>;
  }

  const groupByCategory = (data: CommunityListType): Record<string, typeof data> => {
    return data.reduce(
      (acc, item) => {
        const category = item.type;
        const typeName = filterList.find((item) => item.type === category)?.name;
        const categoryName = typeName || category; // 한글 매핑
        if (!acc[categoryName]) {
          acc[categoryName] = [];
        }
        acc[categoryName].push(item);
        return acc;
      },
      {} as Record<string, typeof data>,
    );
  };

  const moveFilter = (id: number) => {
    setSelectedButton(id);
  };

  return (
    <section className="flex flex-col gap-[2.6rem]">
      {isLoading ? (
        <></>
      ) : (
        <>
          {communityPopularList &&
            Object.keys(groupByCategory(communityPopularList)).map((category, index) => {
              const communityPopularData =
                groupByCategory(communityPopularList)[category as keyof typeof groupByCategory];
              return (
                <article key={index} className="flex flex-col gap-[1rem]">
                  <div onClick={() => moveFilter(index + 2)}>
                    <CommunityTitle title={`${category} 인기 글`} />
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
