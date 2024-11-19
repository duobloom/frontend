import * as React from "react";
import { BoxContainer, BoxContent, BoxHeader } from "@/components/ui/Box";
import Author from "@/components/ui/Author";
import { cn, formatDateConvert } from "@/utils";
import { EmotionType } from "@/types";

import { EMOTION_IMAGES } from "@/assets/image/emoji";

const emotionList = [
  { id: 1, text: "기쁨이 가득한 하루!", emoji: EMOTION_IMAGES.SMILE_HAPPY, alt: "SMILE_HAPPY" },
  { id: 2, text: "마음이 울적할 때는 쉬어가자.", emoji: EMOTION_IMAGES.SAD_CRYING, alt: "SAD_CRYING" },
  { id: 3, text: "화가 나면 잠시 멈추고 숨을 고르자.", emoji: EMOTION_IMAGES.ANGRY, alt: "ANGRY" },
  {
    id: 4,
    text: "피곤할 땐 충분한 휴식이 필요해.",
    emoji: EMOTION_IMAGES.RELIEVED_CLOSED_EYES,
    alt: "RELIEVED_CLOSED_EYES",
  },
  { id: 5, text: "사랑이 넘치는 순간!", emoji: EMOTION_IMAGES.HEART_EYES, alt: "HEART_EYES" },
  { id: 6, text: "깊은 생각이 필요할 때.", emoji: EMOTION_IMAGES.THINKING, alt: "THINKING" },
  { id: 7, text: "눈물이 나는 날도 있어.", emoji: EMOTION_IMAGES.CRYING_LOUDLY, alt: "CRYING_LOUDLY" },
  { id: 8, text: "축하할 일이 있을 땐 마음껏 즐기자!", emoji: EMOTION_IMAGES.STAR_STRUCK, alt: "STAR_STRUCK" },
];

// Props 타입 정의
type TEmotionBoxProps = {
  emotion: EmotionType;
};

// 이모티콘 컴포넌트
interface EmotionBoxEmojiProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
}

const EmotionBoxEmoji = React.forwardRef<HTMLImageElement, EmotionBoxEmojiProps>(
  ({ src, alt, className, ...props }, ref) => (
    <img ref={ref} src={src} alt={alt} className={cn(className)} {...props} />
  ),
);

// EmotionBox 컴포넌트
const EmotionBox = ({ emotion }: TEmotionBoxProps) => {
  const emotionData = emotionList.find((item) => item.id === emotion.emoji);
  const emoji = emotionData?.emoji ?? "😶"; // 찾지 못했을 때 기본 이모티콘
  const alt = emotionData?.alt ?? "이모지";
  const text = emotionData?.text ?? "감정을 표현할 수 없습니다.";

  return (
    <BoxContainer>
      <BoxHeader>
        <Author
          profileImg={emotion.authorProfilePictureUrl}
          name={emotion.authorNickname}
          createdAt={formatDateConvert(emotion.createdAt)}
          isMe={emotion.mine}
        />
        <EmotionBoxEmoji src={emoji} alt={alt} />
      </BoxHeader>
      <div className="ml-[4.8rem]">
        <BoxContent>{text}</BoxContent>
      </div>
    </BoxContainer>
  );
};

EmotionBox.displayName = "EmotionBox";

export { EmotionBox };
