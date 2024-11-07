import Header from "@/components/layout/Header";
import YearCalendar from "@/components/common/YearCalendar";

const CalendarPage = () => {
  return (
    <main>
      <Header variant="backTitle" title="캘린더" />
      <section className="h-[calc(100%-5.8rem)] overflow-y-auto p-[1.5rem] scrollbar-hide">
        <YearCalendar />
      </section>
    </main>
  );
};

export default CalendarPage;
