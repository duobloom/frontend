import { Link } from "react-router-dom";
import dayjs from "dayjs";
import { cn } from "@/utils";

import "dayjs/locale/ko";

// 한국어 로케일 설정
dayjs.locale("ko");

type TYearCalendarProps = {
  startDate?: string;
};

const YearCalendar = ({ startDate }: TYearCalendarProps) => {
  const today = dayjs();
  let startOfPeriod;

  // startDate가 있으면 해당 날짜부터, 없으면 2024-10-01을 기본값으로 설정
  if (startDate) {
    startOfPeriod = dayjs(startDate).startOf("month");
  } else {
    startOfPeriod = dayjs("2024-10-01").startOf("month");
  }

  const months = [];

  // startOfPeriod부터 현재 월까지의 달을 배열로 생성
  let currentMonth = startOfPeriod;
  while (currentMonth.isBefore(today) || currentMonth.isSame(today, "month")) {
    months.push(currentMonth);
    currentMonth = currentMonth.add(1, "month");
  }

  const weekDays = ["일", "월", "화", "수", "목", "금", "토"];

  const getDaysInMonth = (month: dayjs.Dayjs) => {
    const daysInMonth = month.daysInMonth();
    const days = [];

    for (let i = 1; i <= daysInMonth; i++) {
      days.push(month.date(i));
    }

    return days;
  };

  const getEmptyDaysAtStart = (month: dayjs.Dayjs) => {
    return month.startOf("month").day();
  };

  const handleReturn = (isFutureDate: boolean, e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (isFutureDate) e.preventDefault();
  };

  return (
    <div className="flex w-full flex-col gap-[3rem]">
      {months.reverse().map((month) => (
        <div key={month.format("YYYY-MM")} className="flex flex-col gap-[2.6rem]">
          <h2 className="text-[1.6rem] font-bold leading-normal tracking-[-0.032rem] text-black">
            {month.format("YYYY.MM")}
          </h2>
          <div className="grid grid-cols-7">
            {weekDays.map((day) => (
              <div key={day} className={`mb-[1.7rem] text-center text-[1.2rem] font-semibold text-gray-500`}>
                {day}
              </div>
            ))}

            {/* 없는 날짜 빈 칸 */}
            {Array.from({ length: getEmptyDaysAtStart(month) }).map((_, idx) => (
              <div key={`empty-${idx}`} className="aspect-square" />
            ))}

            {getDaysInMonth(month).map((date) => {
              const isToday = date.isSame(today, "day");
              const isSunday = date.day() === 0;
              // const isPastDay = date.isBefore(today, "day");
              // const isCurrentMonth = date.isSame(today, "month");
              const isFutureDate = date.isAfter(today);

              return (
                <Link
                  key={date.format("YYYY-MM-DD")}
                  to={`/calendar/${date.format("YYYYMMDD")}`}
                  onClick={(e) => handleReturn(isFutureDate, e)}
                  className={cn(
                    "flex aspect-square cursor-pointer items-center justify-center rounded-[1rem] text-[1.6rem] font-bold",
                    isToday && "bg-red text-white",
                    isFutureDate && "cursor-not-allowed text-black text-opacity-30",
                    isSunday && "text-red-500",
                  )}
                >
                  {date.format("D")}
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default YearCalendar;