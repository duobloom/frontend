import * as React from "react";
import { cn } from "@/utils";

const BoxContainer = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("rounded-[1.6rem] border border-gray-300 bg-white p-[2rem] shadow-box", className)}
      {...props}
    />
  ),
);
BoxContainer.displayName = "BoxContainer";

const BoxHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("mb-[1rem] flex items-center justify-between", className)} {...props} />
  ),
);
BoxHeader.displayName = "BoxHeader";

const BoxContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("text-[1.3rem] font-medium leading-[1.8rem] text-black", className)} {...props} />
  ),
);
BoxContent.displayName = "BoxContent";

const BoxFooter = React.forwardRef<HTMLDivElement, React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={className} {...props}>
      <hr />
      {children}
    </div>
  ),
);
BoxFooter.displayName = "BoxFooter";

export { BoxContainer, BoxHeader, BoxContent, BoxFooter };
