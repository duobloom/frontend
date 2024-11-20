import { BoxContainer, BoxContent } from "@/components/ui/Box";
import { Skeleton } from "@/components/ui/Skeleton";
import ButtonSkeleton from "../common/ButtonSkeleton";
import React from "react";

//답변 박스 컨테이너 컴포넌트
const AnswerBoxContainer = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(() => (
  <div className="min-h-[10rem] w-full cursor-pointer flex-col rounded-[1.6rem] border bg-gray-50 px-[1.8rem] py-[1.5rem] font-medium text-black" />
));
AnswerBoxContainer.displayName = "AnswerBoxContainer";

// 제목 컴포넌트
const QuestionBoxTitle = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(() => (
  <div className="text-[1.4rem] font-bold leading-normal text-black" />
));
QuestionBoxTitle.displayName = "QuestionBoxTitle";

const QuestionBoxSkeleton = () => {
  return (
    <BoxContainer>
      <div>
        <div className="flex flex-col gap-[1rem]">
          {/* 버튼 스켈레톤 */}
          <div className="flex justify-between">
            <ButtonSkeleton variant="oval" size="sm" className="w-[5rem]" />
            <ButtonSkeleton variant="oval" size="sm" className="w-[7rem]" />
          </div>

          {/* 질문 제목 스켈레톤 */}
          <Skeleton className="my-[.7rem] h-[2rem] w-[100%]" />

          {/* 답변 박스 스켈레톤 */}
          <Skeleton className="h-[2rem] min-h-[10rem] w-full rounded-[1.6rem] bg-gray-100" />
        </div>
      </div>
    </BoxContainer>
  );
};

export default QuestionBoxSkeleton;
