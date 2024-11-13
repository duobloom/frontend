import dayjs from "dayjs";
import "dayjs/locale/ko";

// 한국어 로케일 설정
dayjs.locale("ko");

export const formatDateConvert = (dateString: string): string => {
  return dayjs(dateString).format("YYYY.MM.DD A hh:mm");
};
