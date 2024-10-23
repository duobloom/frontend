import React from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/utils";
import ChevronRightSVG from "@/assets/icon/chevron-right.svg?react";

// Props 타입 정의
type TAlarmAlarmBoxProps = {
  children: React.ReactNode;
};

// 컨테이너 컴포넌트
const AlarmBoxContainer = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "cursor-pointer rounded-[1.6rem] border border-gray-300 bg-white px-[2rem] py-[2.2rem] shadow-box",
        className,
      )}
      {...props}
    />
  ),
);
AlarmBoxContainer.displayName = "AlarmBoxContainer";

// 제목 컴포넌트
const AlarmBoxTitle = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("truncate text-[1.4rem] font-bold leading-normal text-black", className)} {...props} />
  ),
);
AlarmBoxTitle.displayName = "AlarmBoxTitle";

// 내용 컴포넌트
const AlarmBoxContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("text-[1.3rem] font-medium leading-[1.8rem] text-black", className)} {...props} />
  ),
);
AlarmBoxTitle.displayName = "AlarmBoxTitle";

const AlarmBox = ({ children }: TAlarmAlarmBoxProps) => {
  const navigate = useNavigate();

  return (
    <AlarmBoxContainer onClick={() => navigate("/alarm")}>
      <div className="mb-[.3rem] flex items-center justify-between">
        <div className="flex w-[26rem] flex-col justify-start">
          <AlarmBoxTitle>듀오블룸 알리미</AlarmBoxTitle>
          {/* 해당 부분은 props로 시간을 받아야 할 것 같음 */}
          <span className="text-[1.2rem] font-medium leading-normal tracking-tight text-gray-500">오후 01:25</span>
        </div>
        <ChevronRightSVG />
      </div>
      <AlarmBoxContent>{children}</AlarmBoxContent>
    </AlarmBoxContainer>
  );
};

AlarmBox.displayName = "AlarmBox";

export default AlarmBox;
