import { useRef } from "react";
import CommunityTitle from "./CommunityTitle";
import Author from "@/components/ui/Author";
import useDraggable from "@/hooks/useDraggable";

import doctor1 from "@/assets/image/doctor1.png";
import doctor2 from "@/assets/image/doctor2.png";

const testData = [
  { id: 1, img: doctor1, name: "김아영", sub: "난임전문가/의학박사", tags: ["난임", "시험관아기", "임신"] },
  { id: 2, img: doctor2, name: "김준혁", sub: "난임전문가/의학박사", tags: ["임신", "시험관아기"] },
];

const CommunityOpenChat = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const draggableOptions = useDraggable(scrollRef);

  return (
    <article className="flex flex-col gap-[1rem]">
      <CommunityTitle title="듀블 공식 오픈 상담사" />
      <div
        className="flex items-center gap-[.8rem] overflow-x-auto px-[1.5rem] scrollbar-hide"
        ref={scrollRef}
        {...draggableOptions()}
      >
        {testData.map((item) => (
          <div
            key={item.id}
            className="h-[28.5rem] min-w-[28.5rem] cursor-pointer overflow-hidden rounded-[1rem] bg-cover p-[2rem]"
            style={{
              backgroundImage: `linear-gradient(0deg, #9E4624 24.21%, rgba(255, 255, 255, 0.00) 100%), url(${item.img})`,
            }}
          >
            <div className="flex h-full flex-col justify-end gap-[.9rem] text-white">
              <Author
                variant="board"
                profileImg={item.img}
                name={item.name}
                createdAt={item.sub}
                className="text-white"
                textColor="text-white"
              />
              <div className="flex justify-between">
                <div className="flex max-w-[19rem] items-center gap-[.7rem] overflow-hidden whitespace-nowrap">
                  {item.tags.map((tag) => (
                    <div
                      key={tag}
                      className="inline-flex h-[2.4rem] min-w-fit items-center justify-center rounded-[.5rem] bg-[#FFFFFF1A] px-[.6rem] py-[.5rem] text-[1.1rem]"
                    >
                      {tag}
                    </div>
                  ))}
                </div>
                <div className="flex h-[2.4rem] min-w-[3.5rem] items-center justify-center rounded-[10rem] bg-black bg-opacity-80 px-[.7rem] py-[.5rem] text-[1rem] font-bold leading-normal tracking-[1px] text-white">
                  28/30
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </article>
  );
};

export default CommunityOpenChat;
