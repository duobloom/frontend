import Header from "@/components/layout/Header";
import { MainDayAndPoint, MainProfile, MainCalendar, MainFeed, MainAddButton } from "@/components/main";
import { generateDates } from "@/utils/generateDates";

const MainPage = () => {
  const { nowData, yearMonth, calendarData } = generateDates(); // 날짜 데이터

  return (
    <main className="relative">
      <Header variant="titleMove">
        <MainDayAndPoint yearMonth={yearMonth} />
        <div className="hidden h-[2.4rem] w-[.1rem] bg-gray-300 md_mobile:block" />
      </Header>
      <MainProfile nowData={nowData} />
      <MainCalendar yearMonth={yearMonth} calendarData={calendarData} />
      <MainFeed nowData={nowData} />
      <MainAddButton />
    </main>
  );
};

export default MainPage;
