import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import Header from "@/components/layout/Header";
import { EmotionBox, BoardBox, QuestionBox } from "@/components/common";
import { useErrorHandler } from "@/hooks/useErrorHandler";
import { useGetFeedData } from "@/hooks/useGetFeedData";
import { sortFeedData } from "@/utils";
import { BoardType, EmotionType, FeedResponseType, QuestionType } from "@/types";

// 한국어 로케일 설정
dayjs.locale("ko");

const CalendarDetailPage = () => {
  const params = useParams();
  const { handleError } = useErrorHandler();

  const [day, weekDay, currentDate] = [
    dayjs(params.date).format("YYYY.MM.DD"),
    dayjs(params.date).format("dddd"),
    dayjs(params.date).format("YYYY-MM-DD"),
  ];

  const { data, isLoading, error } = useGetFeedData(currentDate);

  // 에러 처리
  if (error) {
    handleError(error);
    return <div>Error loading feed data</div>;
  }

  return (
    <main>
      <Header variant="backTitle" title="" />
      <h1 className="mb-[5rem] mt-[2rem] px-[1.5rem] text-[2.4rem] font-bold leading-[3rem] tracking-[-0.048rem]">
        {day} {weekDay}의 <br />
        기록을 알아보세요
      </h1>
      <section className="flex h-[calc(100%-18.8rem)] flex-col gap-[1.5rem] overflow-auto rounded-t-[3rem] bg-gray-100 bg-[linear-gradient(to_right,_transparent,_transparent_50%,_#E2E2E2_50%,_#E2E2E2_50.3%,_transparent_50.3%)] bg-[length:100%_1px] bg-center p-[1.5rem] shadow-feed scrollbar-hide">
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
    </main>
  );
};

export default CalendarDetailPage;
