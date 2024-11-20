import { Skeleton } from "@/components/ui/Skeleton";
import { cn } from "@/utils";

export const InfoBoxSkeleton = ({ className }: { className?: string }) => {
  return (
    <div className={cn("rounded-[1.6rem] border border-gray-300 bg-white p-[2rem] shadow-box", className)}>
      <div className="mb-[1.5rem] flex items-center justify-between gap-[1.7rem]">
        <div className="flex flex-col gap-[1rem]">
          <Skeleton className="h-[1.8rem] w-[15rem] rounded-md" />
          <Skeleton className="h-[1.2rem] w-[10rem] rounded-md" />
          <Skeleton className="h-[1.2rem] w-[12rem] rounded-md" />
        </div>
        <Skeleton className="h-[8.5rem] w-[8.5rem] rounded-[1rem]" />
      </div>
      <div className="flex justify-between">
        <div className="flex flex-wrap gap-[.8rem]">
          <Skeleton className="h-[2rem] w-[5rem] rounded-md" />
          <Skeleton className="h-[2rem] w-[5rem] rounded-md" />
        </div>
        <Skeleton className="h-[2rem] w-[2rem] rounded-full" />
      </div>
    </div>
  );
};
