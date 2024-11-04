import { IconChevronRight } from "@/assets/icon";
import { useNavigate } from "react-router-dom";

type NavItem = {
  name: string;
  path: string;
};

const NAV_ITEMS: NavItem[] = [
  { name: "내 정보 수정", path: "editinfo" },
  { name: "비밀번호 변경", path: "editinfo" },
  { name: "스크랩", path: "myscrap" },
  { name: "저장한 글", path: "savedpost" },
];

const NavigateBox = () => {
  const navigate = useNavigate();
  return (
    <div className="my-[1rem] flex w-full cursor-pointer flex-col rounded-[1.5rem] bg-[#fff] px-[1rem] py-[1.5rem]">
      {NAV_ITEMS.map((item) => (
        <div
          key={item.path}
          onClick={() => navigate(item.path)}
          className="flex items-center justify-between rounded-[1rem] py-[.5rem] hover:bg-gray-100"
        >
          <p className="px-[.5rem] text-[1.5rem] font-bold text-black">{item.name}</p>
          <IconChevronRight />
        </div>
      ))}
    </div>
  );
};

const AlarmBox = () => {
  return (
    <div className="my-[1rem] flex w-full flex-col rounded-[1.5rem] bg-[#fff] px-[1rem] py-[1.5rem]">
      <div className="flex items-center justify-between rounded-[1rem] py-[.5rem] hover:bg-gray-100">
        <p className="px-[.5rem] text-[1.5rem] font-bold text-black">알림 설정</p>
        <IconChevronRight />
      </div>
      <div className="flex items-center justify-between rounded-[1rem] py-[.5rem] hover:bg-gray-100">
        <p className="px-[.5rem] text-[1.5rem] font-bold text-black">기본 설정</p>
        <IconChevronRight />
      </div>
    </div>
  );
};
export { NavigateBox, AlarmBox };
