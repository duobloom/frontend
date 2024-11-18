import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/common";
import { HospitalListType, PolicyListType } from "@/types";
import { cn } from "@/utils";
import { IconBookMark } from "@/assets/icon";
import { deleteScrapHospital, deleteScrapPolicy, postScrapHospital, postScrapPolicy } from "@/apis";

// Props 타입 정의
type HospitalInfoBoxProps = HospitalListType & { variant: "hospital" };
type PolicyInfoBoxProps = PolicyListType & { variant: "policy" };
type TInfoInfoBoxProps = HospitalInfoBoxProps | PolicyInfoBoxProps;

// 컨테이너 컴포넌트
const InfoBoxContainer = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("rounded-[1.6rem] border border-gray-300 bg-white p-[2rem] shadow-box", className)}
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
  const { variant } = props;
  const [isClick, setIsClick] = useState(props.scraped);
  const navigate = useNavigate();

  // ID 값 추출
  const entityId = variant === "hospital" ? props.hospitalId : props.policyId;
  const entityTitle = variant === "hospital" ? props.hospitalName : props.policyName;
  const entityImg = variant === "hospital" ? props.imageUrl : props.imageUrl;

  // 상세 페이지 이동
  const moveDetail = useCallback(
    (variant: string, id: number) => {
      navigate(`/${variant}/${id}`, { state: { id } });
    },
    [navigate],
  );

  // 북마크 버튼
  const bookMarkFn = useCallback(
    async (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
      e.stopPropagation();
      try {
        setIsClick(!isClick);
        if (!isClick) {
          // 스크랩 추가
          if (variant === "hospital") {
            await postScrapHospital(entityId);
          } else if (variant === "policy") {
            await postScrapPolicy(entityId);
          }
        } else {
          // 스크랩 삭제
          if (variant === "hospital") {
            await deleteScrapHospital(entityId);
          } else if (variant === "policy") {
            await deleteScrapPolicy(entityId);
          }
        }
      } catch (error) {
        console.error("Error updating scrap status:", error);
      }
    },
    [isClick, variant, entityId],
  );

  // 컨텐츠 렌더링
  const renderContent = () => {
    if (variant === "hospital") {
      const { type, time, region, middle, detail } = props;
      const departmentMap: { [key: string]: string } = {
        MATERNITY: "산부인과",
        CARDIOLOGY: "심장내과",
        DERMATOLOGY: "피부과",
      };
      const department = type ? departmentMap[type] || type : "산부인과";
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
            <span>{`${region ?? ""} ${middle ?? ""} ${detail ?? ""}`}</span>
          </div>
        </div>
      );
    } else {
      const { policyHost, startDate, endDate } = props;
      return (
        <div className="text-[1.1rem] leading-[1.32rem]">
          <span className="text-gray-500">{policyHost}</span>
          <div className="mt-[.7rem] flex gap-[.5rem] font-semibold tracking-normal text-black">
            <span>{startDate && endDate ? `${startDate} ~ ${endDate}` : ""}</span>
          </div>
        </div>
      );
    }
  };

  return (
    <InfoBoxContainer onClick={() => moveDetail(variant, entityId)}>
      <div className="mb-[1.5rem] flex items-center justify-between gap-[1.7rem]">
        <div className="flex flex-col gap-[1rem]">
          <div className="w-[20rem]">
            <InfoBoxTitle>{entityTitle}</InfoBoxTitle>
            {renderContent()}
          </div>
        </div>
        <div className="h-[8.5rem] w-[8.5rem] overflow-hidden rounded-[1rem] border border-gray-100">
          <img src={entityImg || "/default-image.png"} alt={entityTitle} className="h-full w-full object-cover" />
        </div>
      </div>
      <div className="flex justify-between">
        <div className="flex flex-wrap gap-[.8rem] overflow-hidden">
          {Array.isArray(props.keywordMappings) &&
            props.keywordMappings.map((keyword, index) => (
              <Badge key={index} variant="tagBadge">
                {keyword.keyword}
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
