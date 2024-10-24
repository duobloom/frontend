import * as React from "react";
import { cn } from "@/utils";
import { EmotionType } from "@/types";

// Props 타입 정의
type TEmotionBoxProps = {
  emotion: EmotionType;
};

// 컨테이너 컴포넌트
const EmotionBoxContainer = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex w-full cursor-pointer flex-col justify-center space-x-4 rounded-[1.6rem] border border-gray-300 bg-white px-[2rem] py-[2rem] shadow-box",
        className,
      )}
      {...props}
    />
  ),
);
EmotionBoxContainer.displayName = "EmotionBoxContainer";

// 프로필 이미지 컴포넌트
const EmotionBoxProfileImage = React.forwardRef<HTMLImageElement, React.ImgHTMLAttributes<HTMLImageElement>>(
  ({ className, ...props }, ref) => (
    <img
      ref={ref}
      className={cn("h-[3.6rem] w-[3.6rem] rounded-full border border-gray-300 object-cover", className)} // 원형 이미지
      {...props}
    />
  ),
);
EmotionBoxProfileImage.displayName = "EmotionBoxProfileImage";

// 제목 컴포넌트
const EmotionBoxTitle = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("truncate text-[1.4rem] font-bold leading-normal text-black", className)} {...props} />
  ),
);
EmotionBoxTitle.displayName = "EmotionBoxTitle";

// 시간 컴포넌트
const EmotionBoxTime = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <span
      ref={ref}
      className={cn("text-[1.2rem] font-medium leading-normal tracking-tight text-gray-500", className)}
      {...props}
    />
  ),
);
EmotionBoxTime.displayName = "EmotionBoxTime";

// 내용 컴포넌트
const EmotionBoxContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("text-[1.4rem] font-medium text-black", className)} {...props} />
  ),
);
EmotionBoxContent.displayName = "EmotionBoxContent";

// 이모티콘 컴포넌트
const EmotionBoxEmoji = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("text-[2.8rem]", className)} {...props} />,
);
EmotionBoxEmoji.displayName = "EmotionBoxEmoji";

// EmotionBox 컴포넌트
const EmotionBox = ({ emotion }: TEmotionBoxProps) => {
  return (
    <EmotionBoxContainer>
      <div className="flex justify-between">
        <div className="flex gap-[.7rem]">
          <EmotionBoxProfileImage src={emotion.user.profileImage} alt={`${emotion.user.name}`} />
          <div className="flex flex-col justify-start">
            <EmotionBoxTitle>{emotion.user.name}</EmotionBoxTitle>
            <EmotionBoxTime>{emotion.updated_at}</EmotionBoxTime>
            <span className="mt-[.7rem]">
              <EmotionBoxContent>{emotion.content}</EmotionBoxContent>
            </span>
          </div>
        </div>
        {/* 이모지 타입 정해지면 수정 */}
        {/* <EmotionBoxEmoji>{emotion.emoji}</EmotionBoxEmoji> */}
      </div>
    </EmotionBoxContainer>
  );
};

EmotionBox.displayName = "EmotionBox";

export { EmotionBox, EmotionBoxProfileImage };
