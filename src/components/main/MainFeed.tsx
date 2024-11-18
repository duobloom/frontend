import { useSearchParams } from "react-router-dom";
import { EmotionBox, BoardBox, QuestionBox } from "@/components/common";
import { useGetFeedData } from "@/hooks/useGetFeedData";
import { sortFeedData } from "@/utils";
import { FeedResponseType, BoardType, EmotionType, QuestionType } from "@/types";

const MainFeed = ({ nowData }: { nowData: string }) => {
  const [searchParams] = useSearchParams();
  const currentDate = searchParams.get("date");

  const { data, isLoading } = useGetFeedData(currentDate || nowData);

  return (
    <section className="relative z-0 mt-[1.5rem] flex h-[calc(100%-24.8rem)] flex-col gap-[1.5rem] overflow-auto rounded-t-[3rem] bg-gray-100 bg-[linear-gradient(to_right,_transparent,_transparent_50%,_#E2E2E2_50%,_#E2E2E2_50.3%,_transparent_50.3%)] bg-[length:100%_1px] bg-center p-[1.5rem] shadow-feed scrollbar-hide">
      {isLoading ? (
        <>로딩 중...</>
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
  );
};

export default MainFeed;
