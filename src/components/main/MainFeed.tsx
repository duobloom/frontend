import { useSearchParams } from "react-router-dom";
import { EmotionBox, BoardBox, QuestionBox } from "@/components/common";
import { useGetFeedData } from "@/hooks/useGetFeedData";
import { useErrorHandler } from "@/hooks/useErrorHandler";
import { sortFeedData } from "@/utils";
import { FeedResponseType, BoardType, EmotionType, QuestionType } from "@/types";
import QuestionBoxSkeleton from "../skeleton/main/QuestionBoxSkeleton";

const MainFeed = ({ nowData }: { nowData: string }) => {
  const [searchParams] = useSearchParams();
  const { handleError } = useErrorHandler();
  const currentDate = searchParams.get("date");

  const { data, isLoading, error } = useGetFeedData(currentDate || nowData);

  // 에러 처리
  if (error) {
    handleError(error);
    return <div>Error loading feed data</div>;
  }

  return (
    <>
      <div className="sticky top-[92px] z-10 mb-[-1.5rem] bg-white">
        <div className="h-[3rem] rounded-t-[3rem] bg-gray-100 shadow-feed" />
        <div className="absolute left-1/2 top-0 h-full w-[.1rem] bg-gray-300" />
      </div>
      <section className="shadow-feed-side relative flex min-h-[calc(100%-19rem)] flex-col gap-[1.5rem] overflow-auto bg-gray-100 px-[1.5rem] pb-[1.5rem]">
        <div className="absolute left-1/2 top-0 h-full w-[.1rem] bg-gray-300" />
        {isLoading ? (
          <QuestionBoxSkeleton />
        ) : (
          <>
            {sortFeedData(data as FeedResponseType).map((data, index) => {
              switch (data.component) {
                case "BoardBox":
                  return <BoardBox key={index} board={data as BoardType} />;
                case "EmotionBox":
                  return <EmotionBox key={index} emotion={data as EmotionType} />;
                case "QuestionBox":
                  return <QuestionBox key={index} data={data as QuestionType} currentDate={currentDate} />;
                default:
                  return null;
              }
            })}
          </>
        )}
      </section>
    </>
  );
};

export default MainFeed;
