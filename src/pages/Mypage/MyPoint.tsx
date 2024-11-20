import { IconPoint } from "@/assets/icon";
import { OptionTabs } from "@/components/common";
import Header from "@/components/layout/Header";
import { TransactionBox } from "@/components/mypage";
import { BoxFooter } from "@/components/ui/Box";
import { useGetPointTransaction } from "@/hooks/useGetPointTransaction";
import React from "react";
import { useLocation } from "react-router-dom";

const MyPoint = () => {
  const location = useLocation();
  const { userPoint, partnerPoint } = location.state || {};
  const [selectedTab, setSelectedTab] = React.useState("내 포인트");

  const { data: TransactionData, isError } = useGetPointTransaction();
  if (isError) console.error("에러가 발생했습니다.");

  // 선택된 탭에 따라 데이터 필터링
  const filteredData = Array.isArray(TransactionData)
    ? TransactionData.filter((data) => (selectedTab === "내 포인트" ? data.mine : !data.mine))
    : [];

  return (
    <div className="flex h-full flex-col">
      <Header variant="backTitle" title="포인트 내역" />
      <div className="flex-1 overflow-y-auto pb-[2rem] scrollbar-hide">
        <span className="sticky top-0">
          <OptionTabs
            tabs={["내 포인트", "동반자 포인트"]}
            selectedTab={selectedTab}
            onTabSelect={setSelectedTab}
            className="bg-[#fff] px-[1.5rem] text-[1.5rem]"
          />
        </span>
        <div>
          <div className="flex flex-col px-[1.5rem]">
            <section className="flex items-center justify-between bg-[#fff]">
              <h1 className="text-[1.7rem] font-bold">전체 포인트</h1>
              <span className="flex items-center gap-[1rem]">
                <IconPoint />
                <h2 className="text-[1.6rem] font-semibold">
                  {selectedTab === "내 포인트" ? `${userPoint}` : `${partnerPoint}`}
                </h2>
              </span>
            </section>
            <BoxFooter />
            <p className="text-[1.3rem] font-semibold text-gray-400">
              내 포인트와 동반자의 포인트를 합산하여 듀오블룸 <br />
              온라인과 팝업 스토어에서 사용 가능합니다
            </p>
          </div>
          <hr className="border-t-4" />
          <section className="px-[1.5rem]">
            <TransactionBox transactions={filteredData || []} />
          </section>
        </div>
      </div>
    </div>
  );
};

export default MyPoint;
