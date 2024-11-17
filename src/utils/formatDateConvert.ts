import dayjs from "dayjs";
import "dayjs/locale/ko";
import relativeTime from "dayjs/plugin/relativeTime";

// 한국어 로케일 설정
dayjs.locale("ko");

// relativeTime 플러그인 추가
dayjs.extend(relativeTime);

export const formatDateConvert = (dateString: string): string => {
  return dayjs(dateString).format("YYYY.MM.DD A hh:mm");
};

export const formatDateConvertWithRelativeTime = (dateString: string): string => {
  const date = dayjs(dateString);
  const now = dayjs();

  // 7일 이내면 상대적인 시간 표시
  if (now.diff(date, "day") <= 7) {
    return date.fromNow(); // 예: "2일 전", "5시간 전"
  }

  // 7일 이상이면 일반적인 날짜 형식으로 표시
  return date.format("YYYY.MM.DD A hh:mm");
};
