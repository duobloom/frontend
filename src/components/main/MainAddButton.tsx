import React, { useState } from "react";
import { MainEmotionForm } from "@/components/main";
import { Drawer, DrawerContent, DrawerTrigger } from "../common/Drawer";
import { PostForm } from "@/components/common";
import { cn } from "@/utils";
import { IconEdit, IconPlus, IconSmileHappy } from "@/assets/icon";

// 아이콘 버튼 컨테이너
const IconButtonContainer = React.forwardRef<
  HTMLButtonElement,
  {
    className: string;
    children: React.ReactNode;
    onClick?: () => void;
  }
>(({ className, children, onClick }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        "absolute right-[2rem] flex h-[5rem] w-[5rem] transform items-center justify-center rounded-full border border-gray-300",
        className,
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
});
IconButtonContainer.displayName = "IconButtonContainer";

const MainAddButton = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [isTextDrawerOpen, setIsTextDrawerOpen] = useState(false);
  const [isEmotionDrawerOpen, setIsEmotionDrawerOpen] = useState(false);

  return (
    <div>
      {/* 글쓰기 버튼 - 외부 영역 클릭해도 닫히지 않음 */}
      <Drawer dismissible={false} open={isTextDrawerOpen} onOpenChange={setIsTextDrawerOpen}>
        <DrawerTrigger asChild>
          <IconButtonContainer
            onClick={() => setIsClicked(false)}
            className={`bottom-[13rem] bg-white transition-all duration-300 ease-out ${
              isClicked ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-8 opacity-0"
            }`}
          >
            <IconEdit />
          </IconButtonContainer>
        </DrawerTrigger>
        <DrawerContent>
          <PostForm type="add" context="feed" onClose={() => setIsTextDrawerOpen(false)} />
        </DrawerContent>
      </Drawer>

      {/* 감정 추가 버튼 */}
      <Drawer open={isEmotionDrawerOpen} onOpenChange={setIsEmotionDrawerOpen}>
        <DrawerTrigger asChild>
          <IconButtonContainer
            onClick={() => setIsClicked(false)}
            className={`bottom-[7.5rem] bg-white transition-all duration-300 ease-out ${
              isClicked ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-8 opacity-0"
            }`}
          >
            <IconSmileHappy />
          </IconButtonContainer>
        </DrawerTrigger>
        <DrawerContent>
          <MainEmotionForm onClose={() => setIsEmotionDrawerOpen(false)} />
        </DrawerContent>
      </Drawer>

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
