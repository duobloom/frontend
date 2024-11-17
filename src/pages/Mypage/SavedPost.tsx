import { OptionTabs } from "@/components/common";
import Header from "@/components/layout/Header";
import React from "react";

const SavedPost = () => {
  const [selectedTab, setSelectedTab] = React.useState("내 피드");
  return (
    <div>
      <Header variant="backTitle" title="저장한 글" />
      <div className="px-[1.5rem] py-[2rem]">
        <OptionTabs
          tabs={["내 피드", "커뮤니티"]}
          selectedTab={selectedTab}
          onTabSelect={setSelectedTab}
          className="text-[1.5rem]"
        />
        {selectedTab === "내 피드" && <div className="py-[1.5rem]">{/* <>브랜치 병합 후 추가</> */}</div>}
        {selectedTab === "커뮤니티" && <div className="py-[1.5rem]"></div>}
      </div>
    </div>
  );
};

export default SavedPost;
