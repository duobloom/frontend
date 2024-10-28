import * as React from "react";
import { cn } from "@/utils";
import { EmotionType } from "@/types";
import { BoxContainer, BoxContent, BoxHeader } from "../ui/Box";
import Author from "../ui/Author";

// Props 타입 정의
type TEmotionBoxProps = {
  emotion: EmotionType;
};

// 이모티콘 컴포넌트
const EmotionBoxEmoji = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("text-[2.8rem]", className)} {...props} />,
);
EmotionBoxEmoji.displayName = "EmotionBoxEmoji";

// EmotionBox 컴포넌트
const EmotionBox = ({ emotion }: TEmotionBoxProps) => {
  return (
    <BoxContainer>
      <BoxHeader>
        <Author profileImg={emotion.user.profileImage} name={emotion.user.name} createdAt={emotion.updated_at} />
        {/* 이모지 타입 정해지면 수정 */}
        {/* <EmotionBoxEmoji>{emotion.emoji}</EmotionBoxEmoji> */}
      </BoxHeader>
      <div className="ml-[4.8rem]">
        <BoxContent>{emotion.content}</BoxContent>
      </div>
    </BoxContainer>
  );
};

EmotionBox.displayName = "EmotionBox";

export { EmotionBox };
