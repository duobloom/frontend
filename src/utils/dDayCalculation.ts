function dDayCalculation(targetDateStr: string) {
  // 목표 날짜 생성 ("YY.MM.DD" 형식)
  const [year, month, day] = targetDateStr.split(".");

  // 2자리 연도를 4자리로 변환 (20XX년으로 처리)
  const fullYear = year.length === 2 ? "20" + year : year;

  const targetDate = new Date(Number(fullYear), Number(month) - 1, Number(day)); // month는 0부터 시작하므로 -1

  // 현재 날짜
  const today = new Date();

  // 시간을 00:00:00으로 통일
  today.setHours(0, 0, 0, 0);
  targetDate.setHours(0, 0, 0, 0);

  // 날짜 차이 계산 (밀리초 단위)
  const diffTime = targetDate.getTime() - today.getTime();

  // 일 단위로 변환 (밀리초 -> 일)
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return `D${diffDays <= 0 ? "+" + Math.abs(diffDays) : "-" + diffDays}`;
}

export default dDayCalculation;
