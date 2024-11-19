import { useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import useDraggable from "@/hooks/useDraggable";
import { cn } from "@/utils";

type TMainCalendarProps = {
  yearMonth: string;
  calendarData: {
    today: {
      date: string;
      weekday: string;
    };
    monthDates: {
      date: string;
      weekday: string;
    }[];
  };
  className?: string;
};

const MainCalendar = ({ yearMonth, calendarData, className }: TMainCalendarProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentDate = searchParams.get("date");
  const nowDate = currentDate ? currentDate.slice(-2) : calendarData.today.date.padStart(2, "0");

  const scrollRef = useRef<HTMLDivElement>(null);
  const draggableOptions = useDraggable(scrollRef);

  // 스크롤 이동
  useEffect(() => {
    const selectElement = scrollRef.current?.querySelector('[data-select="true"]');
    if (selectElement) {
      selectElement.scrollIntoView({
        behavior: nowDate === calendarData.today.date.padStart(2, "0") ? "auto" : "smooth",
        block: "start",
        inline: "center",
      });
    }
  }, [nowDate, calendarData.today.date]);

  // 날짜 선택
  const isSelectedDate = (date: string) => nowDate === date.padStart(2, "0");

  // 미래 날짜
  const isFutureDate = (date: string) => Number(date) > Number(calendarData.today.date);

  // 날짜 이동
  const handleMoveDate = (date: string) => {
    const formattedYearMonth = yearMonth.replace(".", "-");
    const formattedDate = date.padStart(2, "0");
    searchParams.set("date", `${formattedYearMonth}-${formattedDate}`);
    setSearchParams(searchParams);
  };

  return (
    <section
      ref={scrollRef}
      {...draggableOptions()}
      className={cn(
        "z-10 mb-[1.5rem] flex h-[9.5rem] w-full flex-col gap-[.5rem] overflow-x-auto bg-white pb-[1rem] pt-[1.5rem] scrollbar-hide",
        className,
      )}
    >
      <div className="flex items-center gap-[1rem] text-[1.2rem] font-semibold text-gray-500">
        {calendarData.monthDates.map((date) => (
          <div key={date.date} className="flex flex-col items-center gap-[.5rem]">
            <p className="h-[1.6rem] leading-normal">{date.weekday}</p>
            <button
              data-select={isSelectedDate(date.date)}
              disabled={isFutureDate(date.date)}
              className={`flex h-[4.9rem] min-w-[4.9rem] items-center justify-center rounded-[1rem] ${
                isFutureDate(date.date)
                  ? "cursor-not-allowed text-gray-500"
                  : isSelectedDate(date.date)
                    ? "bg-red text-white"
                    : "bg-white text-black"
              }`}
              onClick={() => handleMoveDate(date.date)}
            >
              <span className="text-[1.6rem] font-bold leading-normal tracking-[-0.032rem]">{date.date}</span>
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MainCalendar;
