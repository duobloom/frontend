/**

질문 뱃지
<Badge variant="questionBadge">첫 번째 질문</Badge>
  
태그 뱃지
<Badge variant="tagBadge">태그</Badge>

인증 뱃지
<Badge variant="certBadge">듀블 인증병원</Badge>

 */

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center min-w-[3.6rem] rounded-[.5rem] bg-blue bg-opacity-10 text-blue",
  {
    variants: {
      variant: {
        tagBadge: "w-fit h-[2.4rem] px-[.75rem] py-[.6rem] text-[1.1rem] font-semibold",
        certBadge: "w-fit h-[2rem] px-[.6rem] py-[.4rem] border border-red bg-white text-red text-[1rem] font-bold",
        questionBadge: "w-fit h-[3rem] px-[1.3rem] py-[.8rem] rounded-[10rem] text-[1.2rem] font-bold",
      },
    },
    defaultVariants: {
      variant: "tagBadge",
    },
  },
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
