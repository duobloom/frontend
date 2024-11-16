import { z } from "zod";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/layout/Header";
import YearCalendar from "@/components/common/YearCalendar";
import { getUserSignupDate } from "@/apis/user/getUserSignupDate";
import { useErrorHandler } from "@/hooks/useErrorHandler";
import { logValidationError, validateApiResponse } from "@/utils/zodHelpers";

const SignupResponseSchema = z.object({
  signupDate: z.string(),
});

type signUpResponseType = z.infer<typeof SignupResponseSchema>;

const CalendarPage = () => {
  const { handleError } = useErrorHandler();

  const {
    data: startDate,
    isLoading,
    error,
  } = useQuery<signUpResponseType, Error>({
    queryKey: ["signupDate"],
    queryFn: async () => {
      try {
        const response = await getUserSignupDate();
        return validateApiResponse(response, SignupResponseSchema); // signupDate 검증
      } catch (error) {
        logValidationError(error);
        throw error;
      }
    },
  });

  // 에러 처리
  if (error) {
    handleError(error);
    return <div>Error loading feed data</div>;
  }

  return (
    <main>
      <Header variant="backTitle" title="캘린더" />
      <section className="h-[calc(100%-5.8rem)] overflow-y-auto p-[1.5rem] scrollbar-hide">
        {isLoading ? <>로딩 중...</> : <YearCalendar startDate={startDate} />}
      </section>
    </main>
  );
};

export default CalendarPage;
