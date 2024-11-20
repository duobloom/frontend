import Header from "@/components/layout/Header";
import { Skeleton } from "@/components/ui/Skeleton";
import { Button, OptionTabs } from "../common";
import { BoxFooter } from "../ui/Box";

export const DetailInfoSkeleton = ({
  variant = "hospital",
  className,
}: {
  variant?: "hospital" | "policy";
  className?: string;
}) => (
  <div className={`flex h-full w-full flex-col bg-white ${className}`}>
    <Header variant="backActions" isBookmark={false} handleBookmark={() => {}} />

    <div className="flex-1 overflow-y-scroll px-[1.8rem]">
      <div className="mb-[3rem] mt-[2rem] flex items-center justify-between">
        <div className="flex flex-col gap-[.8rem]">
          <Skeleton className="h-[2.4rem] w-[20rem] rounded-md" />
          <Skeleton className="h-[1.6rem] w-[10rem] rounded-md" />
        </div>
        <Skeleton className="h-[6.5rem] w-[6.5rem] rounded-[1rem]" />
      </div>

      <div className="mb-[2rem] flex gap-[.8rem]">
        <Skeleton className="h-[2rem] w-[4rem] rounded-md" />
        <Skeleton className="h-[2rem] w-[4rem] rounded-md" />
      </div>
      <BoxFooter />
      <Skeleton className="h-[17rem] w-full rounded-[1rem]" />
      <div className="mt-[3rem] flex flex-col gap-[1.5rem]">
        <Skeleton className="h-[4rem] w-full rounded-md" />
        <Skeleton className="h-[4rem] w-full rounded-md" />
        {variant === "policy" && <Skeleton className="h-[4rem] w-full rounded-md" />}
      </div>

      <div className="mt-[2rem] bg-white">
        <div className="flex gap-[1rem]">
          {variant === "policy" ? (
            <OptionTabs
              tabs={["지원 대상", "지원 내용", "관련 정보", "신청 방법"]}
              selectedTab={"지원 대상"}
              onTabSelect={() => {}}
              className="bg-[#fff] text-[1.5rem]"
            />
          ) : (
            <OptionTabs
              tabs={["병원 정보", "의료진", "오시는 길"]}
              selectedTab={"병원 정보"}
              onTabSelect={() => {}}
              className="bg-[#fff] text-[1.5rem]"
            />
          )}
        </div>
      </div>

      <div className="mt-[1rem] flex flex-col gap-[.8rem]">
        <Skeleton className="h-[1.5rem] w-[5rem] rounded-md" />
        <Skeleton className="h-[1.5rem] w-full rounded-md" />
        <Skeleton className="h-[1.5rem] w-full rounded-md" />
        <Skeleton className="h-[1.5rem] w-full rounded-md" />
      </div>

      {variant === "policy" && (
        <div className="mt-[2rem] flex flex-col gap-[1rem]">
          <Skeleton className="h-[4rem] w-full rounded-md" />
          <Skeleton className="h-[4rem] w-full rounded-md" />
        </div>
      )}
    </div>

    <footer className="fixed bottom-0 flex w-full max-w-[37.5rem] items-center gap-[.7rem] border-t border-gray-300 bg-white px-[1.8rem] py-[.7rem]">
      <Button>바로 가기</Button>
      <Button variant="reverse">전화 문의</Button>
    </footer>
  </div>
);
