import * as React from "react";
import { cn } from "@/utils";
import { QuestionType } from "@/types";
import { Button } from "./Button";

// Props 타입 정의
type TQuestionBoxProps = {
  data: QuestionType;
};

// 컨테이너 컴포넌트
const QuestionBoxContainer = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("w-full cursor-pointer flex-col rounded-[1.6rem] border px-[2rem] py-[2rem] shadow-box", className)}
      {...props}
    />
  ),
);
QuestionBoxContainer.displayName = "QuestionBoxContainer";

//답변 박스 컨테이너 컴포넌트
const AnswerBoxContainer = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "min-h-[10rem] w-full cursor-pointer flex-col rounded-[1.6rem] border bg-gray-50 px-[1.8rem] py-[1.5rem] font-medium text-black",
        className,
      )}
      {...props}
    />
  ),
);
AnswerBoxContainer.displayName = "AnswerBoxContainer";

// 제목 컴포넌트
const QuestionBoxTitle = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("text-[1.4rem] font-bold leading-normal text-black", className)} {...props} />
  ),
);
QuestionBoxTitle.displayName = "QuestionBoxTitle";

// 텍스트 컴포넌트
const QuestionBoxContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("text-[1.3rem] font-medium leading-normal text-black", className)} {...props} />
  ),
);
QuestionBoxContent.displayName = "QuestionBoxContent";
// 프로필 이미지 컴포넌트
const QuestionProfileImage = React.forwardRef<HTMLImageElement, React.ImgHTMLAttributes<HTMLImageElement>>(
  ({ className, ...props }, ref) => (
    <img
      ref={ref}
      className={cn("h-[3.6rem] w-[3.6rem] rounded-full border border-gray-300 object-cover", className)}
      {...props}
    />
  ),
);
QuestionProfileImage.displayName = "QuestionBoxProfileImage";

// 시간 컴포넌트
const QuestionBoxTime = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <span
      ref={ref}
      className={cn("text-[1.2rem] font-medium leading-normal tracking-tight text-gray-500", className)}
      {...props}
    />
  ),
);
QuestionBoxTime.displayName = "QuestionBoxTime";

// QuestionBox 컴포넌트
const QuestionBox = ({ data }: TQuestionBoxProps) => {
  const answers = data.answers; // 답변 배열 가져오기

  const hasNoAnswers = answers.length === 0;
  const hasOneAnswer = answers.length === 1;
  const hasTwoAnswers = answers.length >= 2;

  return (
    <QuestionBoxContainer>
      <div>
        <div className="flex flex-col gap-[1rem]">
          <div className="flex justify-between">
            <Button variant="oval" size="sm" className="border-blue-100 bg-blue-100 text-blue">
              첫번째 질문
            </Button>
            {hasNoAnswers && (
              <Button variant="oval" size="sm">
                답변하기
              </Button>
            )}
          </div>
          <QuestionBoxTitle className="my-[.7rem]">{data.content}</QuestionBoxTitle>

          {hasNoAnswers && (
            <AnswerBoxContainer className="flex items-center justify-center text-[1.2rem]">
              <QuestionBoxContent className="text-[1.2rem]">질문에 답변해 주세요</QuestionBoxContent>
            </AnswerBoxContainer>
          )}

          {hasOneAnswer && (
            <>
              <AnswerBoxContainer>
                <div className="flex gap-[.7rem]">
                  <QuestionProfileImage src={answers[0].user.profileImage} alt={answers[0].user.name} />
                  <div className="flex flex-col justify-start">
                    <QuestionBoxTitle>{answers[0].user.name}</QuestionBoxTitle>
                    <QuestionBoxTime>
                      {new Date(answers[0].updated_at).toLocaleTimeString("ko-KR", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </QuestionBoxTime>
                  </div>
                </div>
                <div className="my-[1rem]">
                  <QuestionBoxContent>{answers[0].content}</QuestionBoxContent>
                </div>
                <span>
                  <hr></hr>
                  <p className="mt-[.5rem] text-end text-[1.4rem] text-red">5포인트 획득</p>
                </span>
              </AnswerBoxContainer>
              <AnswerBoxContainer className="flex items-center justify-center text-[1.2rem]">
                <QuestionBoxContent className="text-center text-[1.2rem]">
                  아직 동반자가 질문에 대해<br></br> 답변을 하지 않았습니다
                </QuestionBoxContent>
              </AnswerBoxContainer>
            </>
          )}

          {hasTwoAnswers &&
            answers.map((answer, index) => (
              <>
                <AnswerBoxContainer>
                  <div className="mt-[1rem] flex gap-[.7rem]" key={index}>
                    <QuestionProfileImage src={answer.user.profileImage} alt={answer.user.name} />
                    <div className="flex flex-col justify-start">
                      <QuestionBoxTitle>{answer.user.name}</QuestionBoxTitle>
                      <QuestionBoxTime>
                        {new Date(answer.updated_at).toLocaleTimeString("ko-KR", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </QuestionBoxTime>
                    </div>
                  </div>
                  <div className="my-[1rem]">
                    <QuestionBoxContent>{answers[0].content}</QuestionBoxContent>
                  </div>
                  <span>
                    <hr></hr>
                    <p className="mt-[.5rem] text-end text-[1.4rem] text-red">5포인트 획득</p>
                  </span>
                </AnswerBoxContainer>
              </>
            ))}
        </div>
      </div>
    </QuestionBoxContainer>
  );
};

QuestionBox.displayName = "QuestionBox";

export { QuestionBox };
