import React, { useState } from "react";
import { cn } from "@/utils";
import { MainTextForm, MainEmotionForm } from "@/components/main";
import { IconEdit, IconPlus, IconSmileHappy } from "@/assets/icon";

// 아이콘 버튼 컨테이너
const IconButtonContainer = React.forwardRef<HTMLButtonElement, React.HTMLAttributes<HTMLButtonElement>>(
  ({ className, children, ...props }) => (
    <button
      className={cn(
        "absolute right-[2rem] flex h-[5rem] w-[5rem] transform items-center justify-center rounded-full border border-gray-300",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  ),
);
IconButtonContainer.displayName = "IconButtonContainer";

const MainAddButton = () => {
  const [isClicked, setIsClicked] = useState(false);

  return (
    <div>
      {/* 글쓰기 버튼 */}
      <MainTextForm>
        <IconButtonContainer
          className={`bottom-[13rem] bg-white transition-all duration-300 ease-out ${
            isClicked ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-8 opacity-0"
          }`}
        >
          <IconEdit />
        </IconButtonContainer>
      </MainTextForm>

      {/* 감정 추가 버튼 */}
      <MainEmotionForm>
        <IconButtonContainer
          className={`bottom-[7.5rem] bg-white transition-all duration-300 ease-out ${
            isClicked ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-8 opacity-0"
          }`}
        >
          <IconSmileHappy />
        </IconButtonContainer>
      </MainEmotionForm>

      {/* + 버튼 */}
      <IconButtonContainer
        onClick={() => setIsClicked((prev) => !prev)}
        className={`bottom-[2rem] bg-black duration-300 ${isClicked ? "rotate-45" : ""}`}
      >
        <IconPlus />
      </IconButtonContainer>
    </div>
  );
};

export default MainAddButton;
