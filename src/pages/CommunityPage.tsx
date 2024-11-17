import { useSearchParams } from "react-router-dom";
import Header from "@/components/layout/Header";
import { ScrollableOptions } from "@/components/common";
import {
  CommunityMagazine,
  CommunityOpenChat,
  CommunityPopularList,
  CommunityPostList,
  CommunityWriteButton,
} from "@/components/community";
import { filterList } from "@/constants/CategoryList";

const CommunityPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentFilter = Number(searchParams.get("filter")) || 1;

  const moveFiler = (id: number) => {
    searchParams.set("filter", String(id));
    setSearchParams(searchParams);
  };

  return (
    <main className="relative">
      <Header variant="titleMove" title="커뮤니티" />
      <ScrollableOptions options={filterList} selectedOption={currentFilter} onSelect={moveFiler} />
      <section className="flex h-[calc(100%-10.8rem)] flex-col gap-[2rem] overflow-y-scroll py-[1rem] scrollbar-hide">
        {currentFilter === 1 ? (
          <>
            <CommunityOpenChat />
            <CommunityMagazine />
            <CommunityPopularList setSelectedButton={(id) => moveFiler(Number(id))} />
          </>
        ) : (
          <CommunityPostList name={filterList[currentFilter - 1].name} type={filterList[currentFilter - 1].type} />
        )}
      </section>
      <CommunityWriteButton />
    </main>
  );
};

export default CommunityPage;
