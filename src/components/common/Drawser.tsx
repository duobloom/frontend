import * as React from "react";
import { Drawer as DrawerPrimitive } from "vaul";
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
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Overlay
    ref={ref}
    className={cn("absolute bottom-0 right-[20.5rem] top-0 z-50 w-[37.5rem] bg-black bg-opacity-50", className)}
    {...props}
  />
));
DrawerOverlay.displayName = DrawerPrimitive.Overlay.displayName;
//drawer 내용 컴포넌트
const DrawerContent = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DrawerPortal>
    <DrawerOverlay />
    <DrawerPrimitive.Content
      ref={ref}
      className={cn(
        "fixed bottom-0 right-0 z-50 mr-[20.5rem] flex h-[60rem] w-full max-w-[37.5rem] flex-col rounded-t-[3rem] border-none bg-[#fff] px-[1.8rem] py-[2rem]",
        className,
      )}
      {...props}
    >
      {children}
    </DrawerPrimitive.Content>
  </DrawerPortal>
));
DrawerContent.displayName = "DrawerContent";

export { Drawer, DrawerTrigger, DrawerPortal, DrawerTitle, DrawerClose, DrawerOverlay, DrawerContent };
