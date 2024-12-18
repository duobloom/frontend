import { useNavigate } from "react-router-dom";
import { useErrorHandler } from "@/hooks/useErrorHandler";
import { useGetUserTotalPoint } from "@/hooks/useGetUserTotalPoint";
import LazyIcon from "@/assets/icon/LazyIcon";

const MainDayAndPoint = ({ yearMonth }: { yearMonth: string }) => {
  const navigate = useNavigate();
  const { handleError } = useErrorHandler();

  const { data, error } = useGetUserTotalPoint();

  // 에러 처리
  if (error) {
    handleError(error);
    return <div>Error loading feed data</div>;
  }

  return (
    // <div className="flex items-center gap-[1rem] sm_mobile:gap-[3.1rem]">
    <div className="flex w-full items-center justify-between gap-[1rem]">
      <div
        className="flex h-[4rem] cursor-pointer items-center justify-between gap-[1.3rem] rounded-[10rem] border border-black py-[.8rem] pl-[1.5rem] pr-[1rem]"
        onClick={() => navigate("/calendar")}
      >
        <div className="flex h-[2.4rem] items-center text-[1.8rem] font-extrabold leading-normal tracking-[-0.036rem] text-black">
          {yearMonth}
        </div>
        <div className="flex h-[2.4rem] w-[2.4rem] items-center justify-center">
          <LazyIcon name="icon-vector" />
        </div>
      </div>

      <div className="flex items-center">
        <div className="flex h-[2.4rem] items-center gap-[.5rem]">
          <div className="flex h-[2.4rem] w-[2.4rem] items-center justify-center rounded-full bg-[#FADAD1] text-[1.3rem] font-black leading-normal text-red">
            P
          </div>
          <p className="text-[1.6rem] font-semibold leading-normal tracking-[-0.032rem] text-black">
            {data?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") || ""}
          </p>
        </div>
        <div className="mx-[2rem] hidden h-[2.4rem] w-[.1rem] bg-gray-300 md_mobile:block" />
      </div>
    </div>
  );
};

export default MainDayAndPoint;
