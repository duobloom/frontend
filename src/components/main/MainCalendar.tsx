import React, { useEffect, useRef, useState } from "react";
import useDraggable from "@/hooks/useDraggable";

type TMainCalendarProps = {
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
};

const MainCalendar = ({ calendarData }: TMainCalendarProps) => {
  const [selectDate, setSelectDate] = useState(calendarData.today.date);
  const scrollRef = useRef<HTMLDivElement>(null);
  const draggableOptions = useDraggable(scrollRef);

  useEffect(() => {
    const selectElement = scrollRef.current?.querySelector('[data-select="true"]');
    if (selectElement) {
      selectElement.scrollIntoView({
        behavior: selectDate === calendarData.today.date ? "auto" : "smooth",
        block: "start",
        inline: "center",
      });
    }
  }, [selectDate, calendarData.today.date]);

  const isSelectedDate = (date: string) => selectDate === date;
  const isFutureDate = (date: string) => Number(date) > Number(calendarData.today.date);

  return (
    <section
      ref={scrollRef}
      {...draggableOptions()}
      className="scrollbar-hide flex h-[9.5rem] w-full flex-col gap-[.5rem] overflow-x-auto pb-[1rem] pt-[1.5rem]"
    >
      <div className="flex items-center gap-[1rem] text-[1.2rem] font-semibold text-gray-500">
        {calendarData.monthDates.map((date) => (
          <div key={date.date} className="flex flex-col items-center gap-[.5rem]">
            <p className="h-[1.6rem] leading-normal">{date.weekday}</p>
            <button
              data-select={isSelectedDate(date.date)}
              disabled={isFutureDate(date.date)}
              className={`flex h-[4.9rem] min-w-[4.9rem] items-center justify-center rounded-[1rem] ${isFutureDate(date.date) ? "cursor-not-allowed text-gray-500" : isSelectedDate(date.date) ? "bg-red text-white" : "bg-white text-black"}`}
              onClick={() => setSelectDate(date.date)}
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
