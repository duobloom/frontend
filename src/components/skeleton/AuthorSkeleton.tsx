import { Skeleton } from "@/components/ui/Skeleton";
import { cn } from "@/utils";

const AuthorSkeleton = ({
  variant = "community",
  className,
}: {
  variant?: "community" | "board" | "boardReverse";
  className?: string;
}) => {
  const avatarSizes = {
    community: "h-[3.6rem] w-[3.6rem]",
    board: "h-[5rem] w-[5rem]",
    boardReverse: "h-[5rem] w-[5rem]",
  };

  return (
    <div
      className={cn(`flex items-center gap-[.8rem] ${variant === "boardReverse" ? "flex-row-reverse" : ""}`, className)}
    >
      <div className="relative -m-[0.8rem] p-[0.8rem]">
        <Skeleton className={cn("rounded-full", avatarSizes[variant])} />
      </div>
      <div className={cn(`flex flex-col gap-[.5rem] ${variant === "boardReverse" && "items-end"}`)}>
        <Skeleton className="h-[1.8rem] w-[8rem] rounded-md" />
        <Skeleton className="h-[1.2rem] w-[6rem] rounded-md" />
      </div>
    </div>
  );
};

export default AuthorSkeleton;
