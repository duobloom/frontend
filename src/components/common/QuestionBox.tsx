import * as React from "react";
import { cn } from "@/utils";
import { QuestionType } from "@/types";
import { Button } from "./Button";
import { BoxContainer, BoxContent, BoxFooter, BoxHeader } from "../ui/Box";
import Author from "../ui/Author";

// Props 타입 정의
type TQuestionBoxProps = {
  data: QuestionType;
};

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

// QuestionBox 컴포넌트
const QuestionBox = ({ data }: TQuestionBoxProps) => {
  const answers = data.answers; // 답변 배열 가져오기

  const hasNoAnswers = answers.length === 0;
  const hasOneAnswer = answers.length === 1;
  const hasTwoAnswers = answers.length >= 2;

  return (
    <BoxContainer>
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
              <BoxContent className="text-[1.2rem]">질문에 답변해 주세요</BoxContent>
            </AnswerBoxContainer>
          )}

          {hasOneAnswer && (
            <>
              <AnswerBoxContainer>
                <BoxHeader>
                  <Author
                    profileImg={answers[0].user.profileImage}
                    name={answers[0].user.name}
                    createdAt={answers[0].updated_at}
                  ></Author>
                </BoxHeader>
                <BoxContent>{answers[0].content}</BoxContent>
                <BoxFooter />
                <p className="text-end text-[1.4rem] text-red">5포인트 획득</p>
              </AnswerBoxContainer>
              <AnswerBoxContainer className="flex items-center justify-center text-[1.2rem]">
                <BoxContent className="text-center text-[1.2rem]">
                  아직 동반자가 질문에 대해<br></br> 답변을 하지 않았습니다
                </BoxContent>
              </AnswerBoxContainer>
            </>
          )}

          {hasTwoAnswers &&
            answers.map((answer, index) => (
              <>
                <AnswerBoxContainer>
                  <div className="mt-[1rem] flex gap-[.7rem]" key={index}>
                    <BoxHeader>
                      <Author
                        profileImg={answer.user.profileImage}
                        name={answer.user.name}
                        createdAt={answer.updated_at}
                      ></Author>
                    </BoxHeader>
                  </div>
                  <BoxContent>{answer.content}</BoxContent>
                  <BoxFooter />
                  <p className="text-end text-[1.4rem] text-red">5포인트 획득</p>
                </AnswerBoxContainer>
              </>
            ))}
        </div>
      </div>
    </BoxContainer>
  );
};

QuestionBox.displayName = "QuestionBox";

export { QuestionBox };
