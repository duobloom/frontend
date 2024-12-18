import React, { useState } from "react";
import { MainBoardForm, MainEmotionForm } from "@/components/main";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/common/Drawer";
import { cn } from "@/utils";
import LazyIcon from "@/assets/icon/LazyIcon";

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
      aria-label="폼 열기"
      className={cn(
        "absolute right-[2rem] z-30 flex h-[5rem] w-[5rem] transform items-center justify-center rounded-full border border-gray-300",
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
            <LazyIcon name="icon-edit" />
          </IconButtonContainer>
        </DrawerTrigger>
        <DrawerContent>
          <MainBoardForm type="add" onClose={() => setIsTextDrawerOpen(false)} />
        </DrawerContent>
      </Drawer>

      {/* 감정 추가 버튼 */}
      <Drawer dismissible={false} open={isEmotionDrawerOpen} onOpenChange={setIsEmotionDrawerOpen}>
        <DrawerTrigger asChild>
          <IconButtonContainer
            onClick={() => setIsClicked(false)}
            className={`bottom-[7.5rem] bg-white transition-all duration-300 ease-out ${
              isClicked ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-8 opacity-0"
            }`}
          >
            <LazyIcon name="icon-smiley-happy" />
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
        aria-label="메뉴 열기"
      >
        <LazyIcon name="icon-plus" />
      </IconButtonContainer>
    </div>
  );
};

export default MainAddButton;
