import * as React from "react";
import { BoxContainer, BoxContent, BoxFooter, BoxHeader } from "@/components/ui/Box";
import Author from "@/components/ui/Author";
import { Button } from "@/components/common/Button";
import { Drawer, DrawerTrigger, DrawerContent } from "./Drawer";
import { MainQuestionForm } from "@/components/main";
import { cn, formatDateConvert, generateDates } from "@/utils";
import { QuestionType } from "@/types";

// Props 타입 정의
type TQuestionBoxProps = {
  data: QuestionType;
  currentDate: string | null;
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

const QuestionBox = ({ data, currentDate }: TQuestionBoxProps) => {
  const { nowData } = generateDates();
  const [isQuestionDrawerOpen, setIsQuestionDrawerOpen] = React.useState(false);

  const answers = data.answers;
  const hasNoAnswers = answers.length === 0;
  const hasOneAnswer = answers.length === 1;
  const hasTwoAnswers = answers.length === 2;
  const isMyAnswer = hasOneAnswer && answers[0].mine; // 본인 작성 여부
  const isPartnerAnswer = hasOneAnswer && !answers[0].mine; // 상대방 작성 여부

  const isToday = !currentDate || currentDate === nowData;

  return (
    <BoxContainer>
      <div>
        <div className="flex flex-col gap-[1rem]">
          <div className="flex justify-between">
            <Button variant="oval" size="sm" className="border-blue-100 bg-blue-100 text-blue">
              질문
            </Button>

            {isToday && (hasNoAnswers || isPartnerAnswer) && (
              <Drawer dismissible={false} open={isQuestionDrawerOpen} onOpenChange={setIsQuestionDrawerOpen}>
                <DrawerTrigger asChild>
                  <Button variant="oval" size="sm">
                    답변하기
                  </Button>
                </DrawerTrigger>
                <DrawerContent>
                  <MainQuestionForm
                    qId={data.questionId}
                    qTitle={data.content}
                    isToday={isToday}
                    onClose={() => setIsQuestionDrawerOpen(false)}
                  />
                </DrawerContent>
              </Drawer>
            )}
          </div>

          <QuestionBoxTitle className="my-[.7rem]">{data.content}</QuestionBoxTitle>

          {isToday && hasNoAnswers && (
            <AnswerBoxContainer className="flex items-center justify-center text-[1.2rem]">
              <BoxContent className="text-[1.2rem]">질문에 답변해 주세요</BoxContent>
            </AnswerBoxContainer>
          )}

          {isMyAnswer && (
            <>
              <AnswerBoxContainer>
                <BoxHeader>
                  <Author
                    profileImg={answers[0].profilePictureUrl as string}
                    name={answers[0].nickname}
                    createdAt={formatDateConvert(answers[0].updatedAt)}
                    isMe={answers[0].mine}
                  />
                </BoxHeader>
                <BoxContent>{answers[0].content}</BoxContent>
                <BoxFooter />
                <p className="text-end text-[1.4rem] text-red">5포인트 획득</p>
              </AnswerBoxContainer>
              {isToday && (
                <AnswerBoxContainer className="flex items-center justify-center text-[1.2rem]">
                  <BoxContent className="text-center text-[1.2rem]">
                    아직 동반자가 질문에 대해
                    <br /> 답변을 하지 않았습니다
                  </BoxContent>
                </AnswerBoxContainer>
              )}
            </>
          )}

          {isPartnerAnswer && (
            <>
              <AnswerBoxContainer>
                <BoxHeader>
                  <Author
                    profileImg={answers[0].profilePictureUrl as string}
                    name={answers[0].nickname}
                    createdAt={formatDateConvert(answers[0].updatedAt)}
                    isMe={answers[0].mine}
                  />
                </BoxHeader>
                <BoxContent>{answers[0].content}</BoxContent>
                <BoxFooter />
                <p className="text-end text-[1.4rem] text-red">5포인트 획득</p>
              </AnswerBoxContainer>
              {isToday && (
                <AnswerBoxContainer className="flex items-center justify-center text-[1.2rem]">
                  <BoxContent className="text-[1.2rem]">질문에 답변해 주세요</BoxContent>
                </AnswerBoxContainer>
              )}
            </>
          )}

          {hasTwoAnswers &&
            answers.map((answer, index) => (
              <AnswerBoxContainer key={index}>
                <div className="mt-[1rem] flex gap-[.7rem]">
                  <BoxHeader>
                    <Author
                      profileImg={answer.profilePictureUrl as string}
                      name={answer.nickname}
                      createdAt={formatDateConvert(answer.updatedAt)}
                      isMe={answer.mine}
                    />
                  </BoxHeader>
                </div>
                <BoxContent>{answer.content}</BoxContent>
                <BoxFooter />
                <p className="text-end text-[1.4rem] text-red">5포인트 획득</p>
              </AnswerBoxContainer>
            ))}
        </div>
      </div>
    </BoxContainer>
  );
};

QuestionBox.displayName = "QuestionBox";

export { QuestionBox };
