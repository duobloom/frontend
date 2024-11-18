import * as React from "react";
import { Drawer as DrawerPrimitive } from "vaul";
import { isMobile } from "react-device-detect";
import { cn } from "@/utils";
import { IconClose } from "@/assets/icon";

//drawer 최상위 컴포넌트(컨테이너)
const Drawer = ({ shouldScaleBackground = true, ...props }: React.ComponentProps<typeof DrawerPrimitive.Root>) => (
  <DrawerPrimitive.Root shouldScaleBackground={shouldScaleBackground} {...props} />
);
Drawer.displayName = "Drawer";

//drawer trigger(트리거 버튼 감싸기)
const DrawerTrigger = DrawerPrimitive.Trigger;

const DrawerPortal = DrawerPrimitive.Portal;

//drawer 타이틀 컴포넌트
/*사용 <DrawerTitle text="진료과 선택" /> */
const DrawerTitle = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { text?: string }>(
  ({ className, text, ...props }, ref) => (
    <div ref={ref} className={cn("text-[1.6rem] font-bold leading-normal text-black", className)} {...props}>
      {text}
    </div>
  ),
);
DrawerTitle.displayName = "DrawerTitle";

//close 버튼
const DrawerClose = React.forwardRef<HTMLButtonElement, React.ComponentProps<typeof DrawerPrimitive.Close>>(
  ({ className, ...props }, ref) => (
    <DrawerPrimitive.Close ref={ref} className={className} {...props}>
      <IconClose />
    </DrawerPrimitive.Close>
  ),
);
DrawerClose.displayName = DrawerPrimitive.Close.displayName;

//overlay 컴포넌트
const DrawerOverlay = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay>
>(({ className, ...props }, ref) => {
  const [overlayPosition, setOverlayPosition] = React.useState<string>("0px");

  React.useEffect(() => {
    const calculatePosition = () => {
      const currentWidth = window.innerWidth;

      if (isMobile) {
        // 모바일 뷰에서는 전체 화면 width로 계산
        const calculatedLeft = 0;
        setOverlayPosition(`${calculatedLeft}px`);
      } else if (currentWidth < 1024) {
        // 태블릿 뷰
        const calculatedLeft = (currentWidth - 375) / 2;
        setOverlayPosition(`${calculatedLeft}px`);
      } else {
        // 데스크톱 뷰에서는 right section 기준으로 위치
        const rightSection = document.querySelector(".right-section");
        if (rightSection) {
          const rect = rightSection.getBoundingClientRect();
          setOverlayPosition(`${rect.left}px`);
        }
      }
    };

    calculatePosition();
    window.addEventListener("resize", calculatePosition);
    return () => window.removeEventListener("resize", calculatePosition);
  }, []);

  return (
    <DrawerPrimitive.Overlay
      ref={ref}
      className={cn("fixed bottom-0 top-0 z-50 w-[37.5rem] bg-black/50", isMobile ? "w-full" : "", className)}
      style={{ left: overlayPosition }}
      {...props}
    />
  );
});
DrawerOverlay.displayName = DrawerPrimitive.Overlay.displayName;

//drawer 내용 컴포넌트
const DrawerContent = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content>
>(({ className, children, ...props }, ref) => {
  const [contentPosition, setContentPosition] = React.useState<string>("0px");

  React.useEffect(() => {
    const calculatePosition = () => {
      const currentWidth = window.innerWidth;

      if (isMobile) {
        // 모바일 뷰에서는 전체 화면 width로 계산
        const calculatedLeft = 0;
        setContentPosition(`${calculatedLeft}px`);
      } else if (currentWidth < 1024) {
        // 태블릿 뷰
        const calculatedLeft = (currentWidth - 375) / 2;
        setContentPosition(`${calculatedLeft}px`);
      } else {
        // 데스크톱 뷰에서는 right section 기준으로 위치
        const rightSection = document.querySelector(".right-section");
        if (rightSection) {
          const rect = rightSection.getBoundingClientRect();
          setContentPosition(`${rect.left}px`);
        }
      }
    };

    const resizeObserver = new ResizeObserver(calculatePosition);
    const mutationObserver = new MutationObserver(calculatePosition);

    const rightSection = document.querySelector(".right-section");
    if (rightSection) {
      resizeObserver.observe(rightSection);
      mutationObserver.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
      });
    }

    calculatePosition();
    window.addEventListener("resize", calculatePosition);

    return () => {
      window.removeEventListener("resize", calculatePosition);
      resizeObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return (
    <DrawerPortal>
      <DrawerOverlay />
      <DrawerPrimitive.Content
        ref={ref}
        className={cn(
          "fixed bottom-0 z-50 flex h-[83.2%] flex-col rounded-t-[3rem] border-none bg-white px-[1.8rem] py-[2rem]",
          isMobile ? "w-full" : "w-[37.5rem]",
          className,
        )}
        style={{ left: contentPosition }}
        {...props}
      >
        <DrawerPrimitive.Title className="sr-only">Drawer</DrawerPrimitive.Title>
        <DrawerPrimitive.Description className="sr-only">Drawer content</DrawerPrimitive.Description>
        {children}
      </DrawerPrimitive.Content>
    </DrawerPortal>
  );
});
DrawerContent.displayName = "DrawerContent";

export { Drawer, DrawerTrigger, DrawerPortal, DrawerTitle, DrawerClose, DrawerOverlay, DrawerContent };
