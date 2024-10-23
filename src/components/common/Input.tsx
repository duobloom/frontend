import * as React from "react";
import { cn } from "@/utils/cn";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { Button } from "./Button";

const inputVariants = cva(
  "border-input w-full bg-[#fff] placeholder:text-muted-foreground rounded-[1rem] border border-gray pl-[1.4rem] pr-[7rem] py-[1.2rem] text-[1.4rem] font-medium focus-visible:outline-none disabled:opacity-50 selection:bg-red selection:bg-opacity-70 selection:text-[#fff]",
  {
    variants: { variant: { default: "text-gray cursor-default", active: "text-black cursor-text" } },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>, VariantProps<typeof inputVariants> {
  asChild?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, asChild = false, ...props }, ref) => {
  const [inputValue, setInputValue] = React.useState("");
  const isButtonEnabled = inputValue.trim().length > 0;
  const Comp = asChild ? Slot : "input";

  //   const handleSend = () => {
  //     if (inputValue.trim()) {
  //       // 전송 후 입력 필드 초기화
  //       setInputValue("");
  //     }
  //   };

  //   const handleKeyDown = (e: React.KeyboardEvent) => {
  //     if (e.key === "Enter") {
  //       e.preventDefault();
  //       handleSend();
  //     }
  //   };

  return (
    <div className="relative w-full">
      <Comp
        className={cn(inputVariants({ variant: inputValue ? "active" : "default", className }))}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="댓글을 입력해 주세요"
        ref={ref}
        {...props}
      />
      <div className="absolute right-[1.4rem] top-1/2 -translate-y-1/2 transform">
        <Button disabled={!isButtonEnabled} variant="oval" size="sm">
          완료
        </Button>
      </div>
    </div>
  );
});

Input.displayName = "Input";

export { Input };
