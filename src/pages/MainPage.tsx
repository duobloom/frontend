import Header from "@/components/layout/Header";
import { MainDayAndPoint, MainProfile, MainCalendar, MainFeed, MainAddButton } from "@/components/main";
import { generateDates } from "@/utils/generateDates";

import testProfile from "@/assets/image/test-profile.jpg";
import testProfile2 from "@/assets/image/test-profile2.jpg";

const exampleData = {
  userData: {
    user_id: 1,
    name: "이혜선",
    birth: "1993.02.15",
    profileImage: testProfile,
  },
  partnerData: {
    user_id: 2,
    name: "김준혁",
    birth: "1991.04.05",
    profileImage: testProfile2,
  },
};

const MainPage = () => {
  const { nowData, yearMonth, calendarData } = generateDates(); // 날짜 데이터

  return (
    <main className="relative">
      <Header variant="titleMove">
        <MainDayAndPoint yearMonth={yearMonth} />
        <div className="hidden h-[2.4rem] w-[.1rem] bg-gray-300 md_mobile:block" />
      </Header>
      <MainProfile userData={exampleData.userData} partnerData={exampleData.partnerData} />
      <MainCalendar yearMonth={yearMonth} calendarData={calendarData} />
      <MainFeed nowData={nowData} />
      <MainAddButton />
    </main>
  );
};

export default MainPage;
