import { useState } from "react";
import Header from "@/components/layout/Header";
import { FilterButton } from "@/components/common";
import { CommunityMagazine, CommunityOpenChat, CommunityPostList } from "@/components/community";
import { useSearchParams } from "react-router-dom";
import { IconEdit } from "@/assets/icon";

const filterList = [
  { id: 1, text: "홈" },
  { id: 2, text: "심리케어" },
  { id: 3, text: "멘토링" },
  { id: 4, text: "정책" },
  { id: 5, text: "병원/클리닉" },
  { id: 6, text: "자유" },
];

const CommunityPage = () => {
  const [searchParams] = useSearchParams();
  const [selectedButton, setSelectedButton] = useState(Number(searchParams.get("filter")) || 1);

  return (
    <main className="relative">
      <Header variant="titleMove" title="커뮤니티" />
      <FilterButton filterList={filterList} selectedButton={selectedButton} setSelectedButton={setSelectedButton} />
      <section className="flex h-[calc(100%-10.8rem)] flex-col gap-[2rem] overflow-y-scroll py-[1rem] scrollbar-hide">
        {selectedButton === 1 ? (
          <>
            <CommunityOpenChat />
            <CommunityMagazine />
            {filterList.slice(1).map((item) => (
              <CommunityPostList key={item.id} category={item.text} limit={2} />
            ))}
          </>
        ) : (
          <CommunityPostList category={filterList[selectedButton - 1].text} />
        )}
      </section>
      <button
        className={`shadow-icon absolute bottom-[2rem] right-[2rem] flex h-[5rem] w-[5rem] items-center justify-center rounded-full border border-gray-300 bg-white`}
      >
        <IconEdit />
      </button>
    </main>
  );
};

export default CommunityPage;
