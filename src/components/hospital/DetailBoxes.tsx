import { IconDropdown } from "@/assets/icon";
import { cn } from "@/utils";
import { cva, VariantProps } from "class-variance-authority";
import React from "react";

const textVariants = cva("font-bold", {
  variants: {
    variant: {
      primary: "text-red-500",
      secondary: "text-gray-400",
      default: "text-black",
    },
    size: {
      lg: "text-[2.3rem] font-bold",
      md: "text-[1.7rem] font-bold leading-relaxed",
      sm: "text-[1.5rem] font-medium",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "lg",
  },
});

type TInfoTextProps = React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof textVariants>;

const InfoText = React.forwardRef<HTMLDivElement, TInfoTextProps>(({ className, variant, size, ...props }, ref) => (
  <div ref={ref} className={cn(textVariants({ variant, size }), className)} {...props} />
));
InfoText.displayName = "InfoText";

type TDetailBoxProps = {
  title: string;
  content: string;
  showIcon?: boolean;
  className?: string;
};

const DetailBox: React.FC<TDetailBoxProps> = ({ title, content, showIcon = false }) => {
  return (
    <div className="mb-[.7rem] flex w-full items-center justify-between rounded-[1rem] border border-gray-300 bg-gray-50 px-[1.5rem] py-[1.2rem]">
      <div className="flex gap-[2rem]">
        <span className="text-[1.4rem] font-bold">{title}</span>
        <span className="text-[1.4rem] font-normal">{content}</span>
      </div>
      {showIcon && <IconDropdown />}
    </div>
  );
};

type TClinicHourProps = {
  day: string;
  time: string;
  isClosed?: boolean;
};

const ClinicHour: React.FC<TClinicHourProps> = ({ day, time, isClosed = false }) => {
  return <DetailBox title={day} content={isClosed ? "휴진" : time} className={isClosed ? "text-red-500" : ""} />;
};

type TClinicHoursProps = {
  hours: TClinicHourProps[];
};

const ClinicHours: React.FC<TClinicHoursProps> = ({ hours }) => {
  return (
    <div>
      <h1 className="mb-[2.5rem] text-[1.6rem] font-bold">진료 시간</h1>
      {hours.map((hour, index) => (
        <ClinicHour key={index} day={hour.day} time={hour.time} isClosed={hour.isClosed} />
      ))}
      <h1 className="mb-[2.5rem] text-[1.6rem] font-bold">점심 시간</h1>
      <DetailBox title="평일" content="없음" />
      <DetailBox title="주말" content="없음" />
    </div>
  );
};

export { InfoText, DetailBox, ClinicHours };
