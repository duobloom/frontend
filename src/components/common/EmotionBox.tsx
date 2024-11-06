import * as React from "react";
import { cn } from "@/utils";
import { EmotionType } from "@/types";
import { BoxContainer, BoxContent, BoxHeader } from "../ui/Box";
import Author from "../ui/Author";

const emotionList = [
  { id: 1, text: "기쁨이 가득한 하루!", emoji: "😊" },
  { id: 2, text: "마음이 울적할 때는 쉬어가자.", emoji: "😢" },
  { id: 3, text: "화가 나면 잠시 멈추고 숨을 고르자.", emoji: "😡" },
  { id: 4, text: "피곤할 땐 충분한 휴식이 필요해.", emoji: "😴" },
  { id: 5, text: "사랑이 넘치는 순간!", emoji: "😍" },
  { id: 6, text: "깊은 생각이 필요할 때.", emoji: "🤔" },
  { id: 7, text: "눈물이 나는 날도 있어.", emoji: "😭" },
  { id: 8, text: "축하할 일이 있을 땐 마음껏 즐기자!", emoji: "🥳" },
];

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
  const emotionData = emotionList.find((item) => item.id === emotion.emotion_num);
  const emoji = emotionData?.emoji ?? "😶"; // 찾지 못했을 때 기본 이모티콘
  const text = emotionData?.text ?? "감정을 표현할 수 없습니다.";

  return (
    <BoxContainer>
      <BoxHeader>
        <Author profileImg={emotion.author.profileImage} name={emotion.author.name} createdAt={emotion.updated_at} />
        <EmotionBoxEmoji>{emoji}</EmotionBoxEmoji>
      </BoxHeader>
      <div className="ml-[4.8rem]">
        <BoxContent>{text}</BoxContent>
      </div>
    </BoxContainer>
  );
};

EmotionBox.displayName = "EmotionBox";

export { EmotionBox };
