import { InfoBox, OptionTabs } from "@/components/common";
import Header from "@/components/layout/Header";
import { InfoBoxSkeleton } from "@/components/skeleton/InfoBoxSkeleton";
import { useGetScrapHospital, useGetScrapPolicy } from "@/hooks/useGetScrapData";
import { useRef, useState } from "react";

const MyScrap = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [selectedTab, setSelectedTab] = useState("맞춤 정책");

  const { data: policyData, isLoading: policyLoading } = useGetScrapPolicy(selectedTab === "맞춤 정책");
  const { data: hospitalData, isLoading: hospitalLoading } = useGetScrapHospital(selectedTab === "병원/클리닉");

  const handleTabSelect = (tab: string) => {
    setSelectedTab(tab);
  };

  return (
    <div className="flex h-full w-full flex-col">
      <Header variant="backTitle" title="스크랩" />

      <OptionTabs
        tabs={["맞춤 정책", "병원/클리닉"]}
        selectedTab={selectedTab}
        onTabSelect={handleTabSelect}
        className="text-[1.5rem]"
      />
      <section ref={scrollRef} className="flex-1 gap-[1rem] overflow-y-auto px-[1.5rem] scrollbar-hide">
        <div className="flex flex-col gap-[1rem]">
          {selectedTab === "맞춤 정책" && (
            <>
              {policyLoading && Array.from({ length: 3 }, (_, idx) => <InfoBoxSkeleton key={idx} />)}
              {policyData && policyData.length > 0 ? (
                policyData.map((item) => (
                  <InfoBox
                    key={item.policyId}
                    variant="policy"
                    policyId={item.policyId}
                    policyName={item.policyName}
                    policyHost={item.policyHost}
                    region={item.region}
                    middle={item.middle}
                    detail={item.detail}
                    startDate={item.startDate}
                    endDate={item.endDate}
                    imageUrl={item.imageUrl}
                    scraped={item.scraped}
                    keywordMappings={item.keywordMappings}
                  />
                ))
              ) : (
                <p className="text-center text-[1.5rem] text-gray-400">스크랩 한 정책이 없습니다.</p>
              )}
            </>
          )}
          {selectedTab === "병원/클리닉" && (
            <>
              {hospitalLoading && Array.from({ length: 3 }, (_, idx) => <InfoBoxSkeleton key={idx} />)}
              {hospitalData && hospitalData.length > 0 ? (
                hospitalData?.map((item) => (
                  <InfoBox
                    key={item.hospitalId}
                    variant="hospital"
                    hospitalId={item.hospitalId}
                    hospitalName={item.hospitalName}
                    region={item.region}
                    middle={item.middle}
                    detail={item.detail}
                    type={item.type}
                    time={item.time}
                    latitude={item.latitude}
                    longitude={item.longitude}
                    imageUrl={item.imageUrl}
                    scraped={item.scraped}
                    keywordMappings={item.keywordMappings}
                  />
                ))
              ) : (
                <p className="text-center text-[1.5rem] text-gray-400">스크랩 한 병원/클리닉이 없습니다.</p>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default MyScrap;
