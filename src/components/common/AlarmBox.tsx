import React from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/utils";
import { BoxContainer, BoxContent, BoxFooter, BoxHeader } from "@/components/ui/Box";
import LazyIcon from "@/assets/icon/LazyIcon";

// Props 타입 정의
type TAlarmAlarmBoxProps = {
  children: React.ReactNode;
  timestamp: string;
  point?: number;
};

// 제목 컴포넌트
const AlarmBoxTitle = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("truncate text-[1.4rem] font-bold leading-normal text-black", className)} {...props} />
  ),
);
AlarmBoxTitle.displayName = "AlarmBoxTitle";

const AlarmBox = ({ children, timestamp, point }: TAlarmAlarmBoxProps) => {
  const navigate = useNavigate();

  return (
    <BoxContainer onClick={() => navigate("/alarm")}>
      <BoxHeader>
        <div className="flex w-[26rem] flex-col justify-start">
          <AlarmBoxTitle>듀오블룸 알리미</AlarmBoxTitle>
          {/* 해당 부분은 props로 시간을 받아야 할 것 같음 */}
          <span className="text-[1.2rem] font-medium leading-normal tracking-tight text-gray-500">{timestamp}</span>
        </div>
        <LazyIcon name="icon-chevron-right" />
      </BoxHeader>
      <BoxContent>{children}</BoxContent>
      {point && (
        <BoxFooter>
          <span className="inline-block w-full text-right text-[1.3rem] font-medium leading-normal text-red">
            {point}포인트 획득
          </span>
        </BoxFooter>
      )}
    </BoxContainer>
  );
};

AlarmBox.displayName = "AlarmBox";

export default AlarmBox;
