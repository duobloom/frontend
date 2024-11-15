import { getMyProfile } from "@/apis";
import Header from "@/components/layout/Header";
import { NavigateBox, PointContainer, AlarmBox } from "@/components/mypage";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const MyPage: React.FC = () => {
  const { data: userInfo, isError } = useQuery({
    queryKey: ["TransactionData"],
    queryFn: () => getMyProfile(),
  });

  if (isError) console.error("에러가 발생했습니다.");

  return (
    <div className="flex h-full w-full flex-col">
      <Header variant="titleMove" title="내 정보" />
      <div className="px-[1.5rem]">
        <section className="py-[1.7rem]">
          <div className="flex items-center gap-[1.5rem]">
            <img
              src={userInfo?.profilePictureUrl}
              alt="프로필 이미지"
              className="h-[6.5rem] w-[6.5rem] rounded-full border border-gray-300"
            />
            <div className="flex flex-col">
              <span className="text-[1.8rem] font-bold text-black">{userInfo?.nickname}</span>
              <span className="text-[1.4rem] font-medium text-gray-400">{userInfo?.birth}</span>
            </div>
          </div>
        </section>
        <PointContainer userPoint={userInfo?.balance ?? 0} partnerPoint={userInfo?.coupleBalance ?? 0} />
      </div>
      <section className="mt-[2rem] w-full flex-1 rounded-t-[3rem] bg-gray-100 px-[1.5rem] py-[2rem]">
        <p className="ml-[1rem] text-[1.3rem] text-gray-400">내 정보 관리</p>
        {userInfo && <NavigateBox userInfo={userInfo} />}
        <p className="ml-[1rem] text-[1.3rem] text-gray-400">설정</p>
        <AlarmBox />
      </section>
    </div>
  );
};

export default MyPage;
