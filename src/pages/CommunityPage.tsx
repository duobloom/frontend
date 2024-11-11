import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/layout/Header";
import { ScrollableOptions } from "@/components/common";
import { CommunityMagazine, CommunityOpenChat, CommunityPostList, CommunityWriteButton } from "@/components/community";
import { filterList } from "@/constants/CategoryList";

const CommunityPage = () => {
  const [searchParams] = useSearchParams();
  const [selectedButton, setSelectedButton] = useState(Number(searchParams.get("filter")) || 1);

  return (
    <main className="relative">
      <Header variant="titleMove" title="커뮤니티" />
      <ScrollableOptions options={filterList} selectedOption={selectedButton} onSelect={setSelectedButton} />
      <section className="flex h-[calc(100%-10.8rem)] flex-col gap-[2rem] overflow-y-scroll py-[1rem] scrollbar-hide">
        {selectedButton === 1 ? (
          <>
            <CommunityOpenChat />
            <CommunityMagazine />
            {filterList.slice(1).map((item) => (
              <CommunityPostList key={item.id} type={item.name} limit={2} />
            ))}
          </>
        ) : (
          <CommunityPostList type={filterList[selectedButton - 1].name} />
        )}
      </section>
      <CommunityWriteButton />
    </main>
  );
};

export default CommunityPage;
