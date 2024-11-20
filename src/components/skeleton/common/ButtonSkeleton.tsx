import { Skeleton } from "@/components/ui/Skeleton";
import { cva } from "class-variance-authority";
import { cn } from "@/utils";

const buttonVariantsSkeleton = cva(
  "inline-flex items-center justify-center disabled:opacity-50 disabled:pointer-events-none rounded-[1rem] font-extrabold",
  {
    variants: {
      variant: {
        default: "w-full text-[1.4rem]",
        reverse: "w-full bg-[#fff] text-[1.4rem] text-red",
        oval: "px-[1.2rem] py-[.8rem] rounded-[10rem] text-[1.2rem]",
        ovalReverse: "bg-[#fff] px-[1.2rem] py-[.8rem] rounded-[10rem] text-[1.2rem] text-red",
      },
      size: {
        default: "h-[5rem]",
        md: "h-[4rem] w-[fit-content] min-w-[6.2rem] px-[2rem] py-[1.15rem]",
        sm: "h-[3rem] w-[fit-content] px-[1.2rem] py-[.8rem]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

const ButtonSkeleton = ({
  variant,
  size,
  className,
}: {
  variant?: "reverse" | "oval" | "ovalReverse";
  size?: "md" | "sm";
  className?: string;
}) => {
  return <Skeleton className={cn(buttonVariantsSkeleton({ variant, size, className }), "bg-muted animate-pulse")} />;
};

export default ButtonSkeleton;
