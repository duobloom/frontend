import { useNavigate } from "react-router-dom";
import { IconVector } from "@/assets/icon";

const MainDayAndPoint = ({ point }: { point: number }) => {
  const navigate = useNavigate();

  const moveCalendar = () => {
    navigate("/calendar");
  };

  return (
    <div className="flex w-[26.5rem] items-center">
      <div
        className="flex h-[4rem] w-[13rem] cursor-pointer items-center justify-between rounded-[10rem] border border-black py-[.8rem] pl-[1.5rem] pr-[1rem]"
        onClick={moveCalendar}
      >
        <div className="flex h-[2.4rem] items-center text-[1.8rem] font-extrabold leading-normal tracking-[-0.036rem] text-black">
          2024.10
        </div>
        <div className="flex h-[2.4rem] w-[2.4rem] items-center justify-center">
          <IconVector />
        </div>
      </div>

      <div className="ml-[4.1rem] flex h-[2.4rem] items-center gap-[.5rem]">
        <div className="flex h-[2.4rem] w-[2.4rem] items-center justify-center rounded-full bg-[#FADAD1] text-[1.3rem] font-black leading-normal text-red">
          P
        </div>
        <p className="text-[1.6rem] font-semibold leading-normal tracking-[-0.032rem] text-black">
          {point.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </p>
      </div>

      <div className="ml-[1.5rem] h-[2.4rem] w-[.1rem] bg-gray-300" />
    </div>
  );
};

export default MainDayAndPoint;
