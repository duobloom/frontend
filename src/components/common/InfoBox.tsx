import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/common";
import { HospitalListType, PolicyListType } from "@/types";
import { cn, dDayCalculation } from "@/utils";
import { IconBookMark } from "@/assets/icon";

// Props 타입 정의
type HospitalInfoBoxProps = HospitalListType & { variant: "hospital" };
type PolicyInfoBoxProps = PolicyListType & { variant: "policy" };
type TInfoInfoBoxProps = HospitalInfoBoxProps | PolicyInfoBoxProps;

// 컨테이너 컴포넌트
const InfoBoxContainer = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("min-h-[16.5rem] rounded-[1.6rem] border border-gray-300 bg-white p-[2rem] shadow-box", className)}
      {...props}
    />
  ),
);
InfoBoxContainer.displayName = "InfoBoxContainer";

// 제목 컴포넌트
const InfoBoxTitle = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("mb-[.4rem] truncate text-[1.4rem] font-bold leading-[1.8rem] text-black", className)}
      {...props}
    />
  ),
);
InfoBoxTitle.displayName = "InfoBoxTitle";

const InfoBox = (props: TInfoInfoBoxProps) => {
  const { variant, keywordMappings } = props;
  const [isClick, setIsClick] = useState(false);
  const navigate = useNavigate();

  // ID 값 추출
  const entityId = variant === "hospital" ? props.hospitalId : props.policy_id;
  const entityTitle = variant === "hospital" ? props.hospitalName : props.policy_name;
  const entityImg = variant === "hospital" ? props.linkUrl : props.policy_img;

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
  }, []);

  // 컨텐츠 렌더링
  const renderContent = () => {
    if (variant === "hospital") {
      const { type, time, address } = props;
      const departmentMap: { [key: string]: string } = {
        MATERNITY: "산부인과",
        CARDIOLOGY: "심장내과",
        DERMATOLOGY: "피부과",
      };
      const department = departmentMap[type] || type;
      return (
        <div className="flex flex-col text-[1.1rem] font-medium leading-[1.5rem] text-gray-500">
          <div className="flex gap-[.5rem]">
            <span>{department}</span>
            <span>·</span>
            <span className="tracking-normal">{time ?? "시간 정보 없음"}</span>
          </div>
          <div className="flex gap-[.5rem]">
            <span className="tracking-normal">1.3km</span> {/* 거리 계산 */}
            <span>·</span>
            <span>{address ?? "주소 정보 없음"}</span>
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
    <InfoBoxContainer onClick={() => moveDetail(variant, entityId)}>
      <div className="mb-[1.5rem] flex justify-between gap-[1.7rem]">
        <div className="flex flex-col gap-[1rem]">
          {/* {variant === "hospital" && props.isCert && <Badge variant="certBadge">듀블 인증병원</Badge>} */}
          <div className="w-[22rem]">
            <InfoBoxTitle>{entityTitle}</InfoBoxTitle>
            {renderContent()}
          </div>
        </div>
        <div className="h-[8.5rem] w-[8.5rem] overflow-hidden rounded-[1rem] border border-gray-100">
          <img src={entityImg || "/default-image.png"} alt={entityTitle} className="h-full w-full object-cover" />
        </div>
      </div>
      <div className="flex justify-between">
        <div className="flex w-[21rem] gap-[.8rem] overflow-hidden">
          {keywordMappings &&
            keywordMappings.length > 0 &&
            keywordMappings.map((keyword) => (
              <Badge key={keyword.keywordId} variant="tagBadge">
                {keyword.keywordName}
              </Badge>
            ))}
        </div>
        <button onClick={bookMarkFn}>
          <IconBookMark className={`${isClick ? "stroke-red" : "stroke-gray-300"}`} />
        </button>
      </div>
    </InfoBoxContainer>
  );
};

InfoBox.displayName = "InfoBox";

export default InfoBox;
