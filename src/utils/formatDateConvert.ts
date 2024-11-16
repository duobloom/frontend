import dayjs from "dayjs";
import "dayjs/locale/ko";
import relativeTime from "dayjs/plugin/relativeTime";

// 한국어 로케일 설정
dayjs.locale("ko");
// 상대 시간 플러그인 로드
dayjs.extend(relativeTime);

// 날짜 변환 (2024-11-16 오후 04:30)
export const formatDateConvert = (dateString: string): string => {
  return dayjs(dateString).format("YYYY.MM.DD A hh:mm");
};

// 현재 날짜와 차이 계산 "2일 전" or "2024-11-14 오후 04:30"
export const formatDateWithRelativeTime = (dateString: string): string => {
  const date = dayjs(dateString);

  if (date.isAfter(dayjs().subtract(7, "day"))) {
    return date.fromNow(); // ex. "2일 전"
  } else {
    return date.format("YYYY.MM.DD A hh:mm"); // 7일 이상은 원래 포맷
  }
};
