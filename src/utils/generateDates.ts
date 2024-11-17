import dayjs from "dayjs";
import "dayjs/locale/ko";

// 한국어 로케일 설정
dayjs.locale("ko");

export const generateDates = () => {
  const yearMonth = dayjs().format("YYYY.MM");
  const nowData = dayjs().format("YYYY-MM-DD");

  const today = dayjs();
  const startOfMonth = today.startOf("month");
  const endOfMonth = today.endOf("month");
  const dates = [];
  let current = startOfMonth;

  while (current.isBefore(endOfMonth) || current.isSame(endOfMonth)) {
    dates.push({
      date: current.format("D"), // 일자만 가져오기
      weekday: current.format("ddd"), // 간략한 요일 (예: 월, 화, 수)
    });
    current = current.add(1, "day");
  }

  return {
    nowData,
    yearMonth,
    calendarData: {
      today: {
        date: today.format("D"),
        weekday: today.format("ddd"),
      },
      monthDates: dates,
    },
  };
};
