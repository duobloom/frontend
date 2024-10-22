/**
 * 일반 버튼 (배경색 red)
 * <Button>{children}</Button>
 *
 * 버튼 disabled (배경색 red)
 * <Button disabled>{children}</Button>
 *
 * reverse 버튼 (배경색 white)
 * <Button variant="reverse">{children}</Button>
 *
 * 타원 버튼 - 작은 사이즈 (배경색 red)
 * <Button variant="oval" size="sm">{children}</Button>
 *
 * 타원 reverse 버튼 - 작은 사이즈 (배경색 white)
 * <Button variant="ovalReverse" size="sm">{children}</Button>
 *
 * 타원 버튼 - 중간 사이즈 (배경색 red)
 * <Button variant="oval" size="md">{children}</Button>
 */

import { ButtonHTMLAttributes, forwardRef } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center disabled:opacity-50 disabled:pointer-events-none bg-red text-[#fff] border border-red rounded-[1rem] font-extrabold",
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

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
