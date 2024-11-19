import * as React from "react";
import { cn } from "@/utils";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { Button } from "../common";

const inputVariants = cva(
  "w-full rounded-[1rem] pl-[1.4rem] py-[1.2rem] shadow-box text-[1.4rem] font-bold font-medium focus-visible:outline-none disabled:opacity-50",
  {
    variants: {
      variant: {
        nickname: "border border-gray-300 text-gray-800",
        email: "border border-gray-200 bg-gray-100 text-gray-600 pr-[5rem]",
        birthdate: "border border-gray-200 bg-gray-100 text-gray-600",
        location: "border border-gray-300 bg-[#fff] text-gray-800",
      },
    },
    defaultVariants: {
      variant: "nickname",
    },
  },
);

export interface EditInputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  asChild?: boolean;
  maxLength?: number;
  error?: string;
}

const EditInput = React.forwardRef<HTMLInputElement, EditInputProps>(
  ({ className, variant, asChild = false, maxLength = 12, value, error, onChange, ...props }, ref) => {
    const Comp = asChild ? Slot : "input";
    const [isEmailValid, setIsEmailValid] = React.useState<boolean | null>(null);
    const [isVerified, setIsVerified] = React.useState(false);

    const validateEmail = (email: string) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };

    const handleVerifyClick = () => {
      if (typeof value === "string" && validateEmail(value)) {
        setIsEmailValid(true);
        setIsVerified(true);
      } else {
        setIsEmailValid(false);
      }
    };

    return (
      <>
        <div className="relative w-full">
          <Comp
            className={cn(inputVariants({ variant, className }))}
            value={value}
            onChange={onChange}
            maxLength={variant === "nickname" ? maxLength : undefined}
            ref={ref}
            {...props}
          />
          {variant === "nickname" && typeof value === "string" && (
            <span className="absolute right-[1.4rem] top-1/2 -translate-y-1/2 text-[1.2rem] font-medium text-gray-400">
              {value.length} / {maxLength}
            </span>
          )}
          {variant === "email" && (
            <Button
              variant="oval"
              size="sm"
              className="absolute right-[1rem] top-1/2 -translate-y-1/2"
              onClick={handleVerifyClick}
              disabled={isVerified}
            >
              인증
            </Button>
          )}
        </div>
        <div className="mt-0">
          {isEmailValid === false && variant === "email" && (
            <p className="text-[1.2rem] text-red-400">유효한 이메일을 입력해 주세요.</p>
          )}
          {isEmailValid === true && variant === "email" && (
            <p className="text-[1.2rem] text-blue-500">이메일 인증 성공</p>
          )}
        </div>
        {error && <p className="mt-[0.8rem] text-[1.2rem] text-red-400">{error}</p>}
      </>
    );
  },
);

EditInput.displayName = "EditInput";

export { EditInput };
