import Header from "@/components/layout/Header";
import { NavigateBox, PointContainer, AlarmBox } from "@/components/mypage";
import React from "react";

const userinfo = {
  user_id: 1,
  name: "이혜선",
  birth: "1993.02.15",
  profileImage: "/images/profile-image.jpg",
};

const MyPage: React.FC = () => {
  return (
    <div className="flex h-full w-full flex-col">
      <Header variant="titleMove" title="내 정보" />
      <div className="px-[1.5rem]">
        <section className="py-[1.7rem]">
          <div className="flex items-center gap-[1.5rem]">
            <img src={userinfo.profileImage} className="h-[6.5rem] w-[6.5rem] rounded-full border border-gray-300" />
            <div className="flex flex-col">
              <span className="text-[1.8rem] font-bold text-black">{userinfo.name}</span>
              <span className="text-[1.4rem] font-medium text-gray-400">{userinfo.birth}</span>
            </div>
          </div>
        </section>
        <PointContainer />
      </div>
      <section className="mt-[2rem] w-full flex-1 rounded-t-[3rem] bg-gray-100 px-[1.5rem] py-[2rem]">
        <p className="ml-[1rem] text-[1.3rem] text-gray-400">내 정보 관리</p>
        <NavigateBox />
        <p className="ml-[1rem] text-[1.3rem] text-gray-400">설정</p>
        <AlarmBox />
      </section>
    </div>
  );
};

export default MyPage;
