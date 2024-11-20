import Header from "@/components/layout/Header";
import { MainDayAndPoint, MainProfile, MainCalendar, MainFeed, MainAddButton } from "@/components/main";
import { generateDates } from "@/utils/generateDates";

const MainPage = () => {
  const { nowData, yearMonth, calendarData } = generateDates(); // 날짜 데이터

  return (
    <main className="relative">
      <Header variant="titleMove" className="relative z-10">
        <MainDayAndPoint yearMonth={yearMonth} />
      </Header>
      <div className="h-[calc(100dvh-12.2rem)] overflow-auto scrollbar-hide">
        <MainProfile nowData={nowData} />
        <MainCalendar yearMonth={yearMonth} calendarData={calendarData} className="sticky top-0" />
        <MainFeed nowData={nowData} />
      </div>
      <MainAddButton />
    </main>
  );
};

export default MainPage;
