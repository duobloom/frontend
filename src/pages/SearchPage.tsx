import { InfoBox, OptionTabs } from "@/components/common";
import Header from "@/components/layout/Header";
import { InfoBoxSkeleton } from "@/components/skeleton/InfoBoxSkeleton";
import { useGetSearchHospital } from "@/hooks/useGetSearchHospital";
import { useGetSearchPolicy } from "@/hooks/useGetSearchPolicy";
import { useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";

const SearchPage = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [selectedTab, setSelectedTab] = useState("정책");
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";

  const { data: policyData, isLoading: loadingPolicy } = useGetSearchPolicy(
    query,
    query !== "" && selectedTab === "정책",
  );
  const { data: hospitalData, isLoading: loadingHospital } = useGetSearchHospital(
    query,
    query !== "" && selectedTab === "병원/클리닉",
  );
  // const { data: communityData } = useGetSearchHospital(query, query !== null && selectedTab === "커뮤니티");

  const handleTabSelect = (tab: string) => {
    setSelectedTab(tab);
  };
  return (
    <div className="flex h-full w-full flex-col">
      <Header variant="backSearch" />
      <OptionTabs
        tabs={["정책", "병원/클리닉", "커뮤니티"]}
        selectedTab={selectedTab}
        onTabSelect={handleTabSelect}
      ></OptionTabs>
      <section ref={scrollRef} className="flex-1 overflow-y-auto pb-[2rem] scrollbar-hide">
        {selectedTab === "정책" && (
          <>
            <p className="mb-[1rem] w-full border-b border-gray-200 bg-[#fff] px-[1.3rem] pb-[1.5rem] text-[1.5rem] font-medium">
              {policyData ? `${policyData.length}개의 정책` : "0 개의 정책"}
            </p>

            <div className="flex flex-col gap-[1rem] px-[1.5rem]">
              {loadingPolicy && <InfoBoxSkeleton />}
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
                <p className="mt-[1.5rem] text-center text-[1.4rem] text-gray-500">검색된 정책이 없습니다.</p>
              )}
            </div>
          </>
        )}
        {selectedTab === "병원/클리닉" && (
          <>
            <p className="mb-[1rem] w-full border-b border-gray-200 bg-[#fff] px-[1.3rem] pb-[1.5rem] text-[1.5rem] font-medium">
              {hospitalData ? `${hospitalData.length}개의 병원/클리닉` : "0 개의 병원/클리닉"}
            </p>

            <div className="flex flex-col gap-[1rem] px-[1.5rem]">
              {loadingHospital && <InfoBoxSkeleton />}
              {hospitalData && hospitalData.length > 0 ? (
                hospitalData.map((item) => (
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
                <p className="mt-[1.5rem] text-center text-[1.4rem] text-gray-500">검색된 병원이 없습니다.</p>
              )}
            </div>
          </>
        )}
        {selectedTab === "커뮤니티" && (
          <>
            <p className="mb-[1rem] w-full border-b border-gray-200 bg-[#fff] px-[1.3rem] pb-[1.5rem] text-[1.5rem] font-medium">
              {}개의 커뮤니티 글
            </p>
            <div className="flex flex-col gap-[1rem] px-[1.5rem]"></div>
          </>
        )}
      </section>
    </div>
  );
};

export default SearchPage;
