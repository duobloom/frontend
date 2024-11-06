import React, { useRef } from "react";
import Header from "@/components/layout/Header";
import { Badge, Button, OptionTabs } from "@/components/common";
import { BoxFooter } from "@/components/ui/Box";
import useDraggable from "@/hooks/useDraggable";
import { DetailBox, InfoText } from "@/components/hospital";
import { examplePolicyData, examplePolicyDetail, PolicyInfo } from "@/components/policy/PolicyInfoBox";

const PolicyInfoPage = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const draggableOptions = useDraggable(scrollRef);
  const [isBookMarked, setIsBookMarked] = React.useState(false);
  const [selectedTab, setSelectedTab] = React.useState("지원 대상");
  const targetSectionRef = useRef<HTMLDivElement>(null);
  const contentSectionRef = useRef<HTMLDivElement>(null);
  const infoSectionRef = useRef<HTMLDivElement>(null);
  const methodSectionRef = useRef<HTMLDivElement>(null);
  const policyInfo = examplePolicyDetail;

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
      <Header variant="backActions" isBookmark={isBookMarked} handleBookmark={() => setIsBookMarked(!isBookMarked)} />
      <div
        ref={scrollRef}
        {...draggableOptions}
        className="flex-1 overflow-y-scroll bg-white px-[1.8rem] pt-[2.2rem] scrollbar-hide"
      >
        <title className="mb-[3rem] flex items-center justify-between">
          <span>
            <InfoText>{policyInfo.policy_name}</InfoText>
            <InfoText variant="secondary" size="sm">
              {policyInfo.host}
            </InfoText>
          </span>
          <img
            src={policyInfo.policy_img}
            className="h-[6.5rem] w-[6.5rem] rounded-[1rem] border-gray-200 object-cover"
          />
        </title>
        <span className="mt-[.5rem] flex items-center gap-[.8rem]">
          {examplePolicyData.keywords.map((keyword) => (
            <Badge key={keyword.keyword_id} variant="tagBadge">
              {keyword.keyword_name}
            </Badge>
          ))}
        </span>
        <BoxFooter />
        <DetailBox title="지원 대상" content={policyInfo.target} />
        <DetailBox title="지원 유형" content={policyInfo.category} />
        <DetailBox title="지원 혜택" content={policyInfo.benefit} />
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
              대치동 7번 출구 대치듀블여성병원은 임상경력 풍부한 산부인과 전문의가 편안하고 정확한 진료로 본연의
              여성다움, 자연스럽게 평생 지켜드리는 아름다움, 신뢰와 편안한 미소가 있는 정다움을 드리는 듀오블룸 인증
              산부인과입니다.
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
            <PolicyInfo item={examplePolicyData} />
          </section>
        </div>
      </div>
      <footer className="flex w-full items-center gap-[.7rem] border-t border-gray-300 px-[1.8rem] py-[.7rem]">
        <Button>바로 가기</Button>
        <Button variant="reverse">전화 문의</Button>
      </footer>
    </div>
  );
};

export default PolicyInfoPage;
