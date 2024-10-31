import React from "react";
import Header from "@/components/layout/Header";
import { MainDayAndPoint, MainProfile, MainCalendar } from "@/components/main";

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
  return (
    <main>
      <Header variant="titleMove">
        <MainDayAndPoint point={12392} />
      </Header>
      <MainProfile userData={exampleData.userData} partnerData={exampleData.partnerData} />
      <MainCalendar />
    </main>
  );
};

export default MainPage;
