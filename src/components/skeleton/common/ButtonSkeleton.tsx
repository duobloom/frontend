import { Skeleton } from "@/components/ui/Skeleton";
import { cva } from "class-variance-authority";
import { cn } from "@/utils";

const buttonVariantsSkeleton = cva("inline-flex items-center justify-center rounded-[1rem]", {
  variants: {
    variant: {
      default: "w-full text-[1.4rem]",
      reverse: "w-full text-[1.4rem]",
      oval: "px-[1.2rem] py-[.8rem] rounded-[10rem]",
      ovalReverse: "px-[1.2rem] py-[.8rem] rounded-[10rem]",
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
});

const ButtonSkeleton = ({
  variant,
  size,
  className,
}: {
  variant?: "reverse" | "oval" | "ovalReverse";
  size?: "md" | "sm";
  className?: string;
}) => {
  return <Skeleton className={cn(buttonVariantsSkeleton({ variant, size, className }), "animate-pulse bg-gray-100")} />;
};

export default ButtonSkeleton;
