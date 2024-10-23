import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/common";
import { HospitalType, PolicyListType } from "@/types";
import { dDayCalculation } from "@/utils";
import { cn } from "@/utils";
import BookMarkSVG from "@/assets/icon/bookmark.svg?react";

// Props 타입 정의
type HospitalBoxProps = Omit<HospitalType, "lat" | "lon"> & {
  variant: "hospital";
};

type PolicyBoxProps = PolicyListType & {
  variant: "policy";
};

type TInfoBoxProps = HospitalBoxProps | PolicyBoxProps;

// 컨테이너 컴포넌트
const BoxContainer = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("shadow-box min-h-[16.5rem] rounded-[1.6rem] border border-gray-300 bg-white p-[2rem]", className)}
      {...props}
    />
  ),
);
BoxContainer.displayName = "BoxContainer";

// 제목 컴포넌트
const BoxTitle = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("mb-[.4rem] truncate text-[1.4rem] font-bold leading-[1.8rem] text-black", className)}
      {...props}
    />
  ),
);
BoxTitle.displayName = "BoxTitle";

const Box = (props: TInfoBoxProps) => {
  const { variant, keywords } = props;
  const [isClick, setIsClick] = useState(false);
  const navigate = useNavigate();

  // ID 값 추출
  const entityId = variant === "hospital" ? props.hospital_id : props.policy_id;
  const entityTitle = variant === "hospital" ? props.hospital_name : props.policy_name;
  const entityImg = variant === "hospital" ? props.hospital_img : props.policy_img;

  // 상세 페이지 이동
  const moveDetail = useCallback(
    (variant: string, id: number) => {
      navigate(`/${variant}/${id}`);
    },
    [navigate],
  );

  // 북마크 버튼
  const bookMarkFn = useCallback((e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.stopPropagation();
    setIsClick((prev) => !prev);
    console.log("북마크 클릭");
  }, []);

  // 컨텐츠 렌더링
  const renderContent = () => {
    if (variant === "hospital") {
      const { hospital_type, location, start_date, end_date, isClosed } = props;
      return (
        <div className="flex flex-col text-[1.1rem] font-medium leading-[1.5rem] text-gray-500">
          <div className="flex gap-[.5rem]">
            <span>{hospital_type}</span>
            <span>·</span>
            <span className="tracking-normal">
              {start_date} - {end_date}
            </span>
            <span>·</span>
            <span>{isClosed && "휴진"}</span>
          </div>
          <div className="flex gap-[.5rem]">
            <span className="tracking-normal">1.3km</span>
            <span>·</span>
            <span>{location}</span>
          </div>
        </div>
      );
    } else {
      const { host, start_date, end_date } = props;
      return (
        <div className="text-[1.1rem] leading-[1.32rem]">
          <span className="text-gray-500">{host}</span>
          <div className="mt-[.7rem] flex gap-[.5rem] font-semibold tracking-normal text-black">
            <span>
              {start_date} ~ {end_date}
            </span>
            <span className="text-gray-500">·</span>
            <span className="font-bold text-red">마감 {dDayCalculation(end_date)}</span>
          </div>
        </div>
      );
    }
  };

  return (
    <BoxContainer onClick={() => moveDetail(variant, entityId)}>
      <div className="mb-[1.5rem] flex justify-between gap-[1.7rem]">
        <div className="flex flex-col gap-[1rem]">
          {variant === "hospital" && props.isCert && <Badge variant="certBadge">듀블 인증병원</Badge>}
          <div className="w-[22rem]">
            <BoxTitle>{entityTitle}</BoxTitle>
            {renderContent()}
          </div>
        </div>
        <div className="h-[8.5rem] w-[8.5rem] overflow-hidden rounded-[1rem] border border-gray-100">
          <img src={entityImg} alt={entityTitle} className="h-full w-full object-cover" />
        </div>
      </div>
      <div className="flex justify-between">
        <div className="flex w-[21rem] gap-[.8rem] overflow-hidden">
          {keywords.map((keyword) => (
            <Badge key={keyword.keyword_id} variant="tagBadge">
              {keyword.keyword_name}
            </Badge>
          ))}
        </div>
        <button onClick={bookMarkFn}>
          <BookMarkSVG className={`${isClick ? "stroke-red" : "stroke-gray-300"}`} />
        </button>
      </div>
    </BoxContainer>
  );
};

Box.displayName = "Box";

export default Box;
