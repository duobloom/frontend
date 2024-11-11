import { IconChevronRight, IconPoint } from "@/assets/icon";
import { useNavigate } from "react-router-dom";

type PointContainerProps = {
  userPoint: number;
  partnerPoint: number;
  userId: number | undefined;
};

const PointContainer = ({ userPoint, partnerPoint, userId }: PointContainerProps) => {
  const navigate = useNavigate();

  return (
    <section className="w-full rounded-[1.5rem] border border-gray-300 px-[2rem] py-[1.5rem] shadow-box">
      <div className="flex flex-col">
        <div className="flex w-full justify-between">
          <div className="flex w-full flex-col gap-[.5rem] border-r">
            <span className="text-[1.4rem] font-normal text-gray-400">내 포인트</span>
            <span className="flex gap-[.5rem]">
              <IconPoint />
              <h1 className="text-[1.6rem] font-semibold">{userPoint.toLocaleString()}</h1>
            </span>
          </div>
          <div className="flex w-full flex-col gap-[.5rem] pl-[1.5rem]">
            <span className="text-[1.4rem] font-normal text-gray-400">동반자 포인트</span>
            <span className="flex gap-[.5rem]">
              <IconPoint />
              <h1 className="text-[1.6rem] font-semibold">{partnerPoint.toLocaleString()}</h1>
            </span>
          </div>
        </div>
        <hr />
        <div
          className="flex cursor-pointer items-center justify-between"
          onClick={() => navigate("point", { state: { userId } })}
        >
          <span className="text-[1.5rem] font-medium">우리 부부의 포인트 내역을 알아보세요</span>
          <IconChevronRight />
        </div>
      </div>
    </section>
  );
};

export default PointContainer;
