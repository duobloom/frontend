import React from "react";
import { useNavigate } from "react-router-dom";
import { UserType } from "@/types";
import LazyIcon from "@/assets/icon/LazyIcon";

type NavItem = {
  name: string;
  path: string;
};

const NAV_ITEMS: NavItem[] = [
  { name: "내 정보 수정", path: "editinfo" },
  { name: "비밀번호 변경", path: "" },
  { name: "스크랩", path: "myscrap" },
  { name: "저장한 글", path: "savedpost" },
];

type NavigateBoxProps = {
  userInfo: UserType;
};

const NavigateBox: React.FC<NavigateBoxProps> = ({ userInfo }) => {
  const navigate = useNavigate();

  return (
    <div className="my-[1rem] flex w-full cursor-pointer flex-col rounded-[1.5rem] bg-[#fff] px-[1rem] py-[1.5rem]">
      {NAV_ITEMS.map((item) => (
        <div
          key={item.path}
          onClick={() => navigate(item.path, { state: { userInfo } })}
          className="flex items-center justify-between rounded-[1rem] py-[.5rem]"
        >
          <p className="px-[.5rem] text-[1.5rem] font-bold text-black">{item.name}</p>
          <LazyIcon name="icon-chevron-right" />
        </div>
      ))}
    </div>
  );
};

const AlarmBox = () => {
  return (
    <div className="my-[1rem] flex w-full flex-col rounded-[1.5rem] bg-[#fff] px-[1rem] py-[1.5rem]">
      <div className="flex cursor-pointer items-center justify-between rounded-[1rem] py-[.5rem]">
        <p className="px-[.5rem] text-[1.5rem] font-bold text-black">알림 설정</p>
        <LazyIcon name="icon-chevron-right" />
      </div>
      <div className="flex cursor-pointer items-center justify-between rounded-[1rem] py-[.5rem]">
        <p className="px-[.5rem] text-[1.5rem] font-bold text-black">기본 설정</p>
        <LazyIcon name="icon-chevron-right" />
      </div>
    </div>
  );
};
export { NavigateBox, AlarmBox };
