import * as React from "react";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";

import { buttonVariants } from "@/components/common/Button";
import { cn } from "@/utils";

const AlertDialog = AlertDialogPrimitive.Root;

const AlertDialogTrigger = AlertDialogPrimitive.Trigger;

const AlertDialogPortal = AlertDialogPrimitive.Portal;

const AlertDialogOverlay = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Overlay>
>(({ className, ...props }, ref) => {
  const [overlayPosition, setOverlayPosition] = React.useState("0px");
  const [isMobile, setIsMobile] = React.useState(window.innerWidth <= 375);
  const [isRendered, setIsRendered] = React.useState(false);

  React.useEffect(() => {
    const calculatePosition = () => {
      const currentWidth = window.innerWidth;
      const isMobileView = currentWidth <= 375;
      setIsMobile(isMobileView);

      if (isMobileView) {
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
    setIsRendered(true);

    return () => window.removeEventListener("resize", calculatePosition);
  }, []);

  return (
    <AlertDialogPrimitive.Overlay
      ref={ref}
      className={cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 w-[37.5rem]",
        isMobile ? "w-full" : "",
        isRendered ? "bg-black/50" : "",
        className,
      )}
      style={{ left: overlayPosition }}
      {...props}
    />
  );
});
AlertDialogOverlay.displayName = AlertDialogPrimitive.Overlay.displayName;

const AlertDialogContent = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content>
>(({ className, ...props }, ref) => {
  const [contentPosition, setContentPosition] = React.useState<string>("0px");
  const [screenSize, setScreenSize] = React.useState<"default" | "mobile" | "xsmall">(() => {
    const width = window.innerWidth;
    if (width <= 320) return "xsmall";
    if (width <= 375) return "mobile";
    return "default";
  });

  React.useEffect(() => {
    const calculatePosition = () => {
      const currentWidth = window.innerWidth;

      // 화면 크기에 따른 상태 설정
      if (currentWidth <= 320) {
        setScreenSize("xsmall");
      } else if (currentWidth <= 375) {
        setScreenSize("mobile");
      } else {
        setScreenSize("default");
      }

      if (currentWidth <= 375) {
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

  const getTranslateClass = () => {
    switch (screenSize) {
      case "xsmall":
        return "translate-x-[2.5%]";
      case "mobile":
        return "translate-x-[12.5%]";
      default:
        return "translate-x-[11.5%]";
    }
  };

  return (
    <AlertDialogPortal>
      <AlertDialogOverlay />
      <AlertDialogPrimitive.Content
        ref={ref}
        className={cn(
          "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]",
          "fixed top-[50%] z-50 flex h-[21rem] w-[30.5rem] max-w-lg translate-y-[-50%] flex-col items-center rounded-[3rem] border bg-white p-[2rem] shadow-lg duration-200",
          getTranslateClass(),
          className,
        )}
        style={{ left: contentPosition }}
        {...props}
      />
    </AlertDialogPortal>
  );
});
AlertDialogContent.displayName = AlertDialogPrimitive.Content.displayName;

const AlertDialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("mb-[3.3rem] mt-[1rem] flex w-full flex-col items-center", className)} {...props} />
);
AlertDialogHeader.displayName = "AlertDialogHeader";

const AlertDialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex w-full gap-[.7rem]", className)} {...props} />
);
AlertDialogFooter.displayName = "AlertDialogFooter";

const AlertDialogTitle = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Title
    ref={ref}
    className={cn(
      "flex h-[3.2rem] items-center text-[1.6rem] font-extrabold leading-normal tracking-[-0.032rem] text-black",
      className,
    )}
    {...props}
  />
));
AlertDialogTitle.displayName = AlertDialogPrimitive.Title.displayName;

const AlertDialogDescription = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Description
    ref={ref}
    className={cn(
      "flex h-[4.2rem] items-center text-[1.4rem] font-medium leading-[2rem] tracking-[-0.028] text-black",
      className,
    )}
    {...props}
  />
));
AlertDialogDescription.displayName = AlertDialogPrimitive.Description.displayName;

const AlertDialogAction = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Action>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Action ref={ref} className={cn(buttonVariants({ variant: "default" }), className)} {...props} />
));
AlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName;

const AlertDialogCancel = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Cancel>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Cancel
    ref={ref}
    className={cn(buttonVariants({ variant: "reverse" }), "border-gray-500 text-gray-500", className)}
    {...props}
  />
));
AlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName;

export {
  AlertDialog,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
};
