import { OptionTabs } from "@/components/common";
import { exampleHospitalData, HospitalInfo } from "@/components/hospital";
import Header from "@/components/layout/Header";
import { examplePolicyData, PolicyInfo } from "@/components/policy/PolicyInfoBox";
import React from "react";

const MyScrap = () => {
  const [selectedTab, setSelectedTab] = React.useState("맞춤 정책");
  return (
    <div>
      <Header variant="backTitle" title="스크랩" />
      <div className="px-[1.5rem] py-[2rem]">
        <OptionTabs
          tabs={["맞춤 정책", "병원/클리닉"]}
          selectedTab={selectedTab}
          onTabSelect={setSelectedTab}
          className="text-[1.5rem]"
        />
        {selectedTab === "맞춤 정책" && (
          <div className="py-[1.5rem]">
            <PolicyInfo item={examplePolicyData} />
          </div>
        )}
        {selectedTab === "병원/클리닉" && (
          <div className="py-[1.5rem]">
            <HospitalInfo item={exampleHospitalData} />
          </div>
        )}
      </div>
    </div>
  );
};

export default MyScrap;
