import * as React from "react";
import { cn } from "@/utils";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { Button } from "./Button";

// const inputVariants = cva(
//   "border-input w-full bg-[#fff] placeholder:text-muted-foreground rounded-[1rem] border border-gray pl-[1.4rem] pr-[7rem] py-[1.2rem] text-[1.4rem] font-medium focus-visible:outline-none disabled:opacity-50 selection:bg-red selection:bg-opacity-70 selection:text-[#fff]",
//   {
//     variants: { variant: { default: "text-gray cursor-default", active: "text-black cursor-text" } },
//     defaultVariants: {
//       variant: "default",
//     },
//   },
// );

// #91 font 스케일 조정으로 인한 값 수정
const inputVariants = cva(
  "border-input w-[114.2857%] h-[57.14285px] bg-[#fff] placeholder:text-muted-foreground rounded-[1.142857rem] border border-gray pl-[1.6rem] pr-[8rem] py-[1.371428rem] text-[1.6rem] font-medium focus-visible:outline-none disabled:opacity-50 selection:bg-red selection:bg-opacity-70 selection:text-[#fff] transform scale-[0.875] origin-top-left",
  {
    variants: { variant: { default: "text-gray cursor-default", active: "text-black cursor-text" } },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>, VariantProps<typeof inputVariants> {
  isButton?: boolean;
  asChild?: boolean;
  onSend?: (value: string) => void;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ isButton = true, onSend, className, asChild = false, ...props }, ref) => {
    const [inputValue, setInputValue] = React.useState("");
    const isButtonEnabled = inputValue.trim().length > 0;
    const Comp = asChild ? Slot : "input";

    const handleSend = () => {
      if (inputValue.trim()) {
        // 전송 후 입력 필드 초기화
        setInputValue("");
        onSend?.(inputValue);
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleSend();
      }
    };

    return (
      <div className="relative w-full">
        <Comp
          className={cn(inputVariants({ variant: inputValue ? "active" : "default", className }))}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyUp={handleKeyDown}
          placeholder="댓글을 입력해 주세요"
          ref={ref}
          {...props}
        />
        {isButton && (
          // <div className="absolute right-[1.4rem] top-1/2 -translate-y-1/2 transform">
          //   <Button disabled={!isButtonEnabled} variant="oval" size="sm" onClick={handleSend}>
          //     완료
          //   </Button>
          // </div>

          // font 스케일 조정으로 인한 값 수정
          <div className="absolute right-[1.4rem] top-[45%] -translate-y-[53%] transform">
            <Button disabled={!isButtonEnabled} variant="oval" size="sm" onClick={handleSend}>
              완료
            </Button>
          </div>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";

export { Input };
