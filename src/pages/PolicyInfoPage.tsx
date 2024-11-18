import React, { useRef, useState } from "react";
import Header from "@/components/layout/Header";
import { Badge, Button, OptionTabs } from "@/components/common";
import { BoxFooter } from "@/components/ui/Box";
import useDraggable from "@/hooks/useDraggable";
import { DetailBox, InfoText } from "@/components/hospital";
import { useGetPolicyInfo } from "@/hooks/useGetPolicyInfo";
import { useLocation } from "react-router-dom";
import { deleteScrapPolicy, postScrapPolicy } from "@/apis";

const PolicyInfoPage = () => {
  const location = useLocation();
  const policyId = location.state?.id;
  const scrollRef = useRef<HTMLDivElement>(null);
  const draggableOptions = useDraggable(scrollRef);
  const [selectedTab, setSelectedTab] = useState("지원 대상");
  const targetSectionRef = useRef<HTMLDivElement>(null);
  const contentSectionRef = useRef<HTMLDivElement>(null);
  const infoSectionRef = useRef<HTMLDivElement>(null);
  const methodSectionRef = useRef<HTMLDivElement>(null);

  const { data: policyData, refetch: refetchPolicyData } = useGetPolicyInfo(policyId);

  const handleBookmark = async () => {
    try {
      if (policyData?.scraped) {
        await deleteScrapPolicy(policyId);
      } else {
        await postScrapPolicy(policyId);
      }
      refetchPolicyData();
    } catch (error) {
      console.error("북마크 업데이트 중 에러:", error);
    }
  };

  // 탭 클릭 시 스크롤이동
  const scrollToSection = (sectionRef: React.RefObject<HTMLDivElement>) => {
    if (scrollRef.current && sectionRef.current) {
      scrollRef.current.scrollTo({
        top: sectionRef.current.offsetTop - scrollRef.current.offsetTop,
        behavior: "smooth",
      });
    }
  };
  //탭 클릭 시
  const handleTabSelect = (tab: string) => {
    setSelectedTab(tab);
    if (tab === "지원 대상") scrollToSection(targetSectionRef);
    if (tab === "지원 내용") scrollToSection(contentSectionRef);
    if (tab === "관련 정보") scrollToSection(infoSectionRef);
    if (tab === "신청 방법") scrollToSection(methodSectionRef);
  };

  return (
    <div className="flex h-full flex-col">
      {policyData && <Header variant="backActions" isBookmark={policyData.scraped} handleBookmark={handleBookmark} />}
      <div
        ref={scrollRef}
        {...draggableOptions}
        className="flex-1 overflow-y-scroll bg-white px-[1.8rem] pt-[2.2rem] scrollbar-hide"
      >
        <title className="mb-[3rem] flex items-center justify-between">
          <span>
            <InfoText>{policyData?.policyName}</InfoText>
            <InfoText variant="secondary" size="sm">
              {policyData?.policyHost}
            </InfoText>
          </span>
          <img
            src={policyData?.imageUrl || ""}
            className="h-[6.5rem] w-[6.5rem] rounded-[1rem] border-gray-200 object-cover"
          />
        </title>
        <span className="mt-[.5rem] flex items-center gap-[.8rem]">
          {policyData?.keywordMappings &&
            policyData?.keywordMappings.map((keyword, index) => (
              <Badge key={index} variant="tagBadge">
                {keyword.keyword}
              </Badge>
            ))}
        </span>
        <BoxFooter />
        <DetailBox title="지원 대상" content={policyData?.target || ""} />
        <DetailBox title="지원 유형" content={policyData?.target || ""} />
        <DetailBox title="지원 혜택" content={policyData?.target || ""} />
        <p className="ml-[1.5rem] text-[1.1rem] font-medium text-gray-400">
          출처 : 보건복지부/최종 수정일 : 2023-12-20
        </p>

        <div className="my-[2rem]">
          <OptionTabs
            tabs={["지원 대상", "지원 내용", "관련 정보", "신청 방법"]}
            selectedTab={selectedTab}
            onTabSelect={handleTabSelect}
            className="text-[1.5rem]"
          />
          <section ref={targetSectionRef}>
            <InfoText size="sm" className="font-bold">
              지원 대상
            </InfoText>
            <InfoText size="sm" className="mb-[1.5rem]">
              {policyData?.target}
            </InfoText>
            <BoxFooter />
          </section>
          <section ref={contentSectionRef}>
            <InfoText size="sm" className="font-bold">
              지원 내용
            </InfoText>
            <InfoText size="sm">소개글 와라라라랑</InfoText>
            <BoxFooter />
          </section>
          <section ref={infoSectionRef}>
            <InfoText size="sm" className="font-bold">
              관련 정보
            </InfoText>
            <InfoText size="sm">산부인과 피부과</InfoText>
            <BoxFooter />
          </section>
          <section ref={methodSectionRef}>
            <InfoText size="sm" className="font-bold">
              신청 방법
            </InfoText>
            <BoxFooter />
          </section>
          <section>
            <InfoText size="md" className="mb-[1.5rem]">
              관련 정책
            </InfoText>
          </section>
        </div>
      </div>
      <footer className="fixed bottom-0 flex w-[37.5rem] max-w-[37.5rem] items-center gap-[.7rem] border-t border-gray-300 px-[1.8rem] py-[.7rem]">
        <Button>
          <a href={policyData?.linkUrl || ""}>바로 가기</a>
        </Button>
        <Button variant="reverse">전화 문의</Button>
      </footer>
    </div>
  );
};

export default PolicyInfoPage;
